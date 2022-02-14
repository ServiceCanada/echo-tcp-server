const net = require( "net" );
const fs = require( "fs" );
require( "dotenv" ).config();

const envConfig = process.env || {};

const port = envConfig.PORT || 7070;
const host = envConfig.HOST || "127.0.0.1";
const server = net.createServer();

const autoReply =  JSON.parse( envConfig.AUTOREPLY || "{}" );
let autoReplyLoaded = {};

server.listen( port, host, () => {
    console.log( "TCP Echo Server is running on port " + port + ".");
});

server.on( "connection", function( sock ) {
    console.log( "CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort );

    sock.on( "data", function( data ) {

    	let dataStr = data.toString();

	    console.log( "RECEIVING: " + sock.remoteAddress + ":" + sock.remotePort);    	
        console.log( "START:\n" + dataStr + "\n\nEND" );

        // Reply a precooked answer if available
        for ( const [ request, responsePath ] of Object.entries( autoReply ) ) {
        	if ( dataStr.startsWith( request ) ) {
        		let response = autoReplyLoaded[ request ] || loadAutoReply( request, responsePath );
        		console.log( "AUTO-REPLIED: " + request );
        		sock.end( response );
        		break;
        	}
        }

        // Echo to the server, if nothing was sent
        if ( sock.readyState === "open" || sock.readyState === "writeOnly" ) {
        	console.log( "ECHO-REPLIED" );
	        sock.end("\nECHO START\n" + dataStr + "\n\nECHO END\n");
	    }
    });
});

// Load the response from FS
function loadAutoReply( key, responsePath ) {
	let response = fs.readFileSync( responsePath );
	autoReplyLoaded[ key ] = response;
	return response;
}
