export const API_URL = 'http://localhost:5000/';
//export const API_URL = 'https://storyservice.sd.di.huc.knaw.nl/';

export const mdFields =
    {
        "dct:abstract" : {"class": "abstract", "label": "Abstract"},
        "dct:accessRights" : {"class": "accessRights", "label": "Access rights"},
        "dct:accrualMethod" : {"class": "accrualMethod", "label": "Accrual method"},
        "dct:accrualPeriodicity" : {"class": "accrualPeriodicity", "label": "Accrual periodicity"},
        "dct:accrualPolicy" : {"class": "accrualPolicy", "label": "Accrual policy"},
        "dct:alternative" : {"class": "alternative", "label": "Alternative"},
        "dct:audience" : {"class": "audience", "label": "Audience"},
        "dct:available" : {"class": "available", "label": "Available"},
        "dct:bibliographicCitation" : {"class": "bibliographicCitation", "label": "Bibliographic citation"},
        "dct:conformsTo" : {"class": "conformsTo", "label": "Conforms to"},
        "dct:contributor" : {"class": "contributor", "label": "Contributor"},
        "dct:coverage" : {"class": "coverage", "label": "Coverage"},
        "dct:created" : {"class": "created", "label": "Created"},
        "dct:creator" : {"class": "creator", "label": "Creator"},
        "dct:date" : {"class": "date", "label": "Date"},
        "dct:dateAccepted" : {"class": "dateAccepted", "label": "Date accepted"},
        "dct:dateCopyrighted" : {"class": "dateCopyrighted", "label": "Date copyrighted"},
        "dct:description" : {"class": "description", "label": "Description"},
        "dct:educationLevel" : {"class": "educationLevel", "label": "Education level"},
        "dct:extent" : {"class": "extent", "label": "Extent"},
        "dct:format" : {"class": "format", "label": "Format"},
        "dct:hasFormat" : {"class": "hasFormat", "label": "Has format"},
        "dct:hasPart" : {"class": "hasPart", "label": "Has part"},
        "dct:hasVersion" : {"class": "hasVersion", "label": "Has version"},
        "dct:identifier" : {"class": "identifier", "label": "Identifier"},
        "dct:instructionalMethod" : {"class": "instructionalMethod", "label": "Instructional method"},
        "dct:isFormatOf" : {"class": "isFormatOf", "label": "Is format of"},
        "dct:isPartOf" : {"class": "isPartOf", "label": "Is part of"},
        "dct:isReferencedBy" : {"class": "isReferencedBy", "label": "Is referenced by"},
        "dct:isReplacedBy" : {"class": "isReplacedBy", "label": "Is replaced by"},
        "dct:isRequiredBy" : {"class": "isRequiredBy", "label": "Is required by"},
        "dct:issued" : {"class": "issued", "label": "Issued"},
        "dct:isVersionOf" : {"class": "isVersionOf", "label": "Is version of"},
        "dct:language" : {"class": "language", "label": "Language"},
        "dct:license" : {"class": "license", "label": "License"},
        "dct:mediator" : {"class": "mediator", "label": "Mediator"},
        "dct:medium" : {"class": "medium", "label": "Medium"},
        "dct:modified" : {"class": "modified", "label": "Modified"},
        "dct:provenance" : {"class": "provenance", "label": "Provenance"},
        "dct:publisher" : {"class": "publisher", "label": "Publisher"},
        "dct:references" : {"class": "references", "label": "References"},
        "dct:relation" : {"class": "relation", "label": "Relation"},
        "dct:replaces" : {"class": "replaces", "label": "Replaces"},
        "dct:requires" : {"class": "requires", "label": "Requires"},
        "dct:rights" : {"class": "rights", "label": "Rights"},
        "dct:rightsHolder" : {"class": "rightsHolder", "label": "Rights holder"},
        "dct:source" : {"class": "source", "label": "Source"},
        "dct:spatial" : {"class": "spatial", "label": "Spatial"},
        "dct:subject" : {"class": "subject", "label": "Subject"},
        "dct:tableOfContents" : {"class": "tableOfContents", "label": "Table of contents"},
        "dct:title" : {"class": "title", "label": "Title"},
        "dct:type" : {"class": "type", "label": "Type"},
        "dct:valid" : {"class": "valid", "label": "Valid"},
        "ds:Reviewer" : {"class": "Reviewer", "label": "Reviewer"},
        "ds:LandingPage" : {"class": "LandingPage", "label": "LandingPage"},
        "ds:Endpoint" : {"class": "Endpoint", "label": "Endpoint"}
    }

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

export function swapUp(value: string, array:string[]) {
        const index = array.indexOf(value);
        [array[index], array[index-1]] = [array[index-1], array[index]];
        return array;
}