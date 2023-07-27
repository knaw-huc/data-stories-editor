export const API_URL = 'http://localhost:5000/';

export function findBlockById(currentBlock, dataStoryData) {
    const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

    var out;
    for (var i = 0; i < allBlocks.length; i++) {
        if (allBlocks[i]['_attributes']["xml:id"] === currentBlock) {
            out = i;
        }
    }
    return out;
}