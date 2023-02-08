/*
Advanced key exchange (AKE) is a method of encryption that
involves two parties, where one is secure (server) and the other
is not (client). Both parties generate their own keys which are
session based, and then exchange the public with the other party.

This means that there is never a hardcoded private key in the unsecure
client, and that the channel that is carrying the data is not required
to be secure (think of a public wifi network).

Once the session has been completed, could be time based, the keys are
discarded and new keys can be exchanged.

Scenario:
- A client connects to a server. The server prepares a private and public
key and sends the public key to the client. The private counterpart is saved
in a temporary storage, such as redis.
- The client receives the public key, prepares its own pair of keys and encrypts
the username and password with the servers public key.
- The client sends the encrypted data and its public key to the server.
- The server receives the data, decrypts it with its private key and checks
the credentials. If there is a mismatch, the keys are still kept in the temporary
storage, but no data is sent back.
- All data from the server -> client is encrypted with the clients public key.
- All data from the client -> server is encrypted with the servers public key.

This key-session is not the same as the session that is used for authentication.
Those can last for any period of time, the key-session is severed after the
user has disconnected, since the private key that the client keeps is not
saved anywhere.

So the next time they come to the site, the client will establish a new
key-session.

The server handles the key-session cycling by making the record in the redis
storage expire. If there is no counterpart to the incoming public key in the
storage, the server will be unable to decrypt the data and send a request back
to the client with a new public key, requesting the data again with the new key
that the client will generate.

This form of encryption is used in the banking industry, where the client
is the bank and the server is the customer. The customer is not required
to have a secure connection to the bank, but the bank is required to have
a secure connection to the customer.

If 100 clients connect to the server, the server will have 100 private keys
in its temporary storage. One for each session. If one client is compromised,
none of the other clients are affected.
*/
