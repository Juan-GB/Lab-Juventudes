const { Client, Databases, ID, Query } = Appwrite;   

function returnAppwriteClient() {
    const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6644a15b000c78641b71');
    
    return client;
}

function getMessageFromInput() {return document.querySelector("#input-message")};

function checkValueValidation({value}) {
    const palavras = value.split(' ');

    if(value !== '' && value.length >= 30 && palavras.length > 8) {
        return true;
    } else {
        return false;
    }
}

async function createDocumentInAppwrite({value}) {
    const client = returnAppwriteClient();
    const databases = new Databases(client);

    const DATABASE_ID = '6644a1c30004f9ad9e6c';
    const COLLECTION_ID = '6644a1f1001cf7aeb8ec';

    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                message: value,
            }
        );

        return response;
    } catch(error) {
        console.log(error);
        return null;
    }
}

function onLoad() {
    const input = getMessageFromInput();
    const value = input.value;

    const validation_of_value = checkValueValidation({value});
    let response;

    if(validation_of_value) {
        response = createDocumentInAppwrite({value});
    } else {
        response = null;
    }

    console.log(response);
}
