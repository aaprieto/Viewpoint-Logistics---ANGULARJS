<?php
# $Id: ae_tlch_xmlreq.php,v 1.7 2013/01/25 01:51:59 clamat Exp $
/*****************************************************************************
	Application Environment -- Communications Hub

	Pass request from Responsibility Dashboard to server and pass
	response back.

	Copyright 2009,2010 Maves International Software
	ALL RIGHTS RESERVED
------------------------------------------------------------------------------
Must be invoked via a POST request.  Request body must be a well-formed
XML document.
*****************************************************************************/

/* Response is always an XML document.  Tell the client so. */
header( 'Content-type: application/xml' );

/*
 * Normally, the server provides the entire response for the dashboard,
 * but if we can't get far enough through our operation to get that
 * response, we should provide the dashboard a response that it will
 * understand.  This function creates a response that is identical in
 * format to what the server would create for a failed request.
 *
 * We include the empty <refresh_data> element because lots of client-side
 * code assumes that that element is always present.
 */
function ae_fnmkfailresp( $ae_lvreason ) {
	return	'<?xml version="1.0" encoding="utf-8" ?>'	.
		'<ezware_response>'				.
		'<status>FAIL</status>'				.
		'<refresh_data></refresh_data>'			.
		'<reason>' . $ae_lvreason . '</reason>'		.
		'<version>1</version>'				.
		'</ezware_response>';
}

/* Sometimes we have to fake up an OK response with no data in it. */
function ae_fnmkemptyresp() {
	return	'<?xml version="1.0" encoding="utf-8" ?>'	.
		'<ezware_response>'				.
		'<status>OK</status>'				.
		'<refresh_data></refresh_data>'			.
		'<version>1</version>'				.
		'</ezware_response>';
}

/*
 * Convenience function to make our error log messages consistent.
 */
function ae_fnerror_log( $ae_lvmessage ) {
	error_log( 'ae_tlch_xmlreq.php: ' . $ae_lvmessage );
}

/* Ensure that we were invoked via POST. */
if ( $_SERVER['REQUEST_METHOD'] != 'POST' ) {
	ae_fnerror_log( 'not invoked via POST request' );
	echo ae_fnmkfailresp( 'Internal Client Error' );
	exit();
}

/* Ensure we have monitor connection information. */
if	(
	! array_key_exists( 'MIS_CH_HOST', $_SERVER )	||
	! array_key_exists( 'MIS_CH_PORT', $_SERVER )	||
	$_SERVER['MIS_CH_HOST'] == ''			||
	$_SERVER['MIS_CH_PORT'] == 0
	) {
		ae_fnerror_log	(
				'"SetEnv MIS_CH_HOST" or '	.
				'related setting missing or '	.
				'invalid in httpd configuration.'
				);
		echo ae_fnmkfailresp( 'Internal Server Error' );
		exit();
}

/*
 * Mostly, we want to send the request body (an XML document) to the
 * monitor.  We may want to adjust the document before sending it on.  The
 * XML document may be quite large, so we avoid loading the whole document
 * into PHP's memory at once; we use the XMLReader and XMLWriter classes
 * to deal with the XML as a stream instead.
 */
$ae_lvxml_r = new XMLReader();
$ae_lvxml_w = new XMLWriter();

if ( $ae_lvxml_w->openMemory() === false ) {
	ae_fnerror_log( 'XMLWriter::openMemory() failed' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	$ae_lvxml_r->close();
	exit();
}

/* No need to pretty-print the XML we're sending to the monitor. */
$ae_lvxml_w->setIndent( false );

/* Start the output XML document. */
if ( $ae_lvxml_w->startDocument( '1.0', 'UTF-8' ) === false ) {
	ae_fnerror_log( 'XMLWriter::startDocument() failed' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	$ae_lvxml_r->close();
	exit();
}

/* Initialize debug-injection flag. */
$ae_lvsend_debug = false;

/* Connect to monitor. */
$ae_lvmonsock=fsockopen	(
			$_SERVER['MIS_CH_HOST'],
			$_SERVER['MIS_CH_PORT'],
			$ae_lvserrno,
			$ae_lvserrstr,
			5
			);
if ( $ae_lvmonsock === false ) {
	ae_fnerror_log	(
			'fsockopen('			.
			$_SERVER['MIS_CH_HOST']	.
			', '				.
			$_SERVER['MIS_CH_PORT']	.
			'): '				.
			$ae_lvserrstr
			);
	echo ae_fnmkfailresp( 'Internal Server Error' );
	$ae_lvxml_r->close();
	exit();
}

/* Send monitor command keyword so it knows what's coming. */
$ae_lvwork = fwrite( $ae_lvmonsock, 'MIS_RD_REQUEST/v2/' );
if ( $ae_lvwork === false || $ae_lvwork != 18 ) {
	ae_fnerror_log( 'fwrite keyword to monitor failed' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	fclose( $ae_lvmonsock );
	exit();
}

/*
 * Tell the XML reader where to find the incoming XML document.
 */
if ( $ae_lvxml_r->open( 'php://input' ) === false ) {
	ae_fnerror_log( 'XMLReader::open failed' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	fclose( $ae_lvmonsock );
	exit();
}

/*
 * Copy incoming document to monitor, possibly setting the debug-injection
 * flag along the way.  We don't copy some things (comments, for example)
 * because we know that they're not useful.
 */
while ( $ae_lvxml_r->read() ) {

	switch ( $ae_lvxml_r->nodeType ) {

		case XMLReader::ELEMENT:
			$ae_lvxml_w->startElement( $ae_lvxml_r->name );
			if ( $ae_lvxml_r->hasAttributes )
				while ( $ae_lvxml_r->moveToNextAttribute() ) {
					$ae_lvxml_w->writeAttribute	(
							$ae_lvxml_r->name,
							$ae_lvxml_r->value
									);
				}
			if ( $ae_lvxml_r->isEmptyElement )
				$ae_lvxml_w->endElement();
			break;

		/* 
		 * End of element.  We don't close the root element (the
		 * element at depth 0) in the output stream here because
		 * we may want to add additional elements to the document.
		 */
		case XMLReader::END_ELEMENT:

			/* Root element? */
			if	( $ae_lvxml_r->depth == 0 )	break;

			/* Not root element.  End current element. */
			$ae_lvxml_w->endElement();

			/*
			 * Ask XML writer stream for whatever output we've
			 * created so far.  This also clears the memory
			 * buffer used by the XML writer stream, preparing
			 * for the next chunk we're going to build.
			 */
			$ae_lvto_write	= $ae_lvxml_w->outputMemory();
			$ae_lvw_total	= strlen( $ae_lvto_write );

			/*
			 * Send to monitor.  Loop is because writing to a
			 * network stream (like our socket) may not write
			 * everything all at once.
			 */
			for	(
				$ae_lvw_sofar = 0;
				$ae_lvw_sofar < $ae_lvw_total;
				$ae_lvw_sofar += $ae_lvw_thistime
				) {
				$ae_lvw_thistime = fwrite	(
								$ae_lvmonsock,
					substr( $ae_lvto_write, $ae_lvw_sofar )
								);

				if	( ! $ae_lvw_thistime )	break;
			}

			/* Did a write fail? */
			if ( $ae_lvw_sofar < $ae_lvw_total ) {
				ae_fnerror_log( 'fwrite chunk to monitor failed' );
				echo ae_fnmkfailresp( 'Internal Server Error' );
				fclose( $ae_lvmonsock );
				$ae_lvxml_r->close();
				exit();
			}

			break;

		/* Copy text nodes. */
		case XMLReader::TEXT:

			/*
			 * Set debug-injection flag for certain requests.
			 *
			 * UNCOMMENT AND ADJUST THE FOLLOWING TO DEBUG THE
			 * SERVER-SIDE refreshData COLLECTION PROCESS IN A
			 * FOREGROUND WORKER PROCESS.
			 */
			/*
			if ( strpos( $ae_lvxml_r->value, ',ORDER' ) )
				$ae_lvsend_debug = true;
			*/

			/* Copy text. */
			$ae_lvxml_w->text( $ae_lvxml_r->value );
			break;

		/* Copy CDATA nodes. */
		case XMLReader::CDATA:
			$ae_lvxml_w->writeCData( $ae_lvxml_r->value );
			break;

		/* Must copy Processing Instruction (PI) nodes. */
		case XMLReader::PI:
			$ae_lvxml_w->writePI	(
						$ae_lvxml_r->name,
						$ae_lvxml_r->value
						);
			break;
	}
}

/* We're finished with the incoming XML document. */
$ae_lvxml_r->close();

/*
 * Inject the debug element, if something in the copy loop decided that we
 * need to do that.
 */
if ( $ae_lvsend_debug )
	$ae_lvxml_w->writeElement( 'debug', 'true' );


/* End the root element and the document. */

$ae_lvxml_w->endElement();

$ae_lvxml_w->endDocument();


/* Send the final chunk of the XML output stream to the monitor. */
$ae_lvto_write	= $ae_lvxml_w->outputMemory();
$ae_lvw_total	= strlen( $ae_lvto_write );

for	(
	$ae_lvw_sofar = 0;
	$ae_lvw_sofar < $ae_lvw_total;
	$ae_lvw_sofar += $ae_lvw_wrote
	) {
	$ae_lvw_wrote = fwrite	(
				$ae_lvmonsock,
				substr( $ae_lvto_write, $ae_lvw_sofar )
				);

	if	( ! $ae_lvw_wrote )	break;
}

if ( $ae_lvw_sofar < $ae_lvw_total ) {
	ae_fnerror_log( 'fwrite trailer to monitor failed' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	fclose( $ae_lvmonsock );
	exit();
}

/*
 * Some of the requests we handle are for jobs, and some of those jobs
 * take a long time, so give the monitor lots of time to complete the
 * jobs and return our response.
 *
 * Err on the side of excess, not caution, and allow 8 hours.  Whether
 * other parts of the system (httpd, the browser, etc.) will wait that
 * long is unknown.
 *
 * If we can't set the timeout, keep going anyway; we assume that the
 * default timeout remains in effect if we couldn't set the new one, and
 * the default timeout should be enough for the majority of the requests
 * we handle (the long ones are a minority).
 */
$ae_lvwork = stream_set_timeout( $ae_lvmonsock, 28800 );
if ( $ae_lvwork === false ) {
	ae_fnerror_log( "couldn't set socket timeout to 8h" .
			"; continuing anyway" );
}

/*
 * Get response from monitor.  Response from monitor goes straight out to
 * client, as is.
 */
$count = fpassthru( $ae_lvmonsock );

if ( $count === false ) {
	ae_fnerror_log( 'error in fpassthru() from monitor socket' );
	echo ae_fnmkfailresp( 'Internal Server Error' );
	fclose( $ae_lvmonsock );
	exit();
}

/*
 * Monitor sent us an empty response or we timed out waiting for the
 * reponse.  Record this in the error log, but fake up a proper response
 * document with no data in it for the client; in most cases, this
 * situation, while it might be annoying to the operator because they
 * didn't get the data they wanted, isn't fatal to the operation of the
 * client.
 */
if ( $count == 0 ) {
	ae_fnerror_log( '0 bytes read from monitor socket' );
	echo ae_fnmkemptyresp();
}

/* Be neat and close the socket. */
fclose( $ae_lvmonsock );
?>
