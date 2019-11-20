class UrlEndPointGenerator {
    static BaseEndPointUrl() {
        return process.env.REACT_APP_API_URL;
    }
}

export default UrlEndPointGenerator;