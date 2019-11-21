class UrlEndPointGenerator {
    static BaseEndPointUrl() {
        return process.env.REACT_APP_API_URL;
    }

    static GetCharactersUrl(page,name) {
        let query = "";
        if (page && name) { query = `/?page=${page}&name=${name}`; }
        else if (page) { query = `/?page=${page}`; }
        else if (name) { query = `/?name=${name}`; }

        return UrlEndPointGenerator.BaseEndPointUrl() + "/character" + query;
    }

    static GetIndividualCharacterUrl(id) {
        return UrlEndPointGenerator.BaseEndPointUrl() + "/character/" + id;
    }
}

export default UrlEndPointGenerator;