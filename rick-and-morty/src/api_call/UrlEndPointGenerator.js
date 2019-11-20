class UrlEndPointGenerator {
    static BaseEndPointUrl() {
        return process.env.REACT_APP_API_URL;
    }

    static GetCharactersUrl(page) {
        if (page) {
            return UrlEndPointGenerator.BaseEndPointUrl() + "/character/?page=" + page;
        } else {
            return UrlEndPointGenerator.BaseEndPointUrl() + "/character";
        }
    }
}

export default UrlEndPointGenerator;