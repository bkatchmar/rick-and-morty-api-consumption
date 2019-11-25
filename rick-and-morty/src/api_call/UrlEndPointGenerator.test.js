import UrlEndPointGenerator from "./UrlEndPointGenerator";

it("Base Endpoint is what we expect", () => {
    expect(UrlEndPointGenerator.BaseEndPointUrl()).toBe("https://localhost:8080/api");
});

it("Test Different GetCharactersUrl()", () => {
    expect(UrlEndPointGenerator.GetCharactersUrl()).toBe("https://localhost:8080/api/character");
    expect(UrlEndPointGenerator.GetCharactersUrl(2)).toBe("https://localhost:8080/api/character/?page=2");
    expect(UrlEndPointGenerator.GetCharactersUrl(10)).toBe("https://localhost:8080/api/character/?page=10");
});

it("Test Different GetCharactersUrl() with a name", () => {
    expect(UrlEndPointGenerator.GetCharactersUrl(1,"krom")).toBe("https://localhost:8080/api/character/?page=1&name=krom");
    expect(UrlEndPointGenerator.GetCharactersUrl(1,"")).toBe("https://localhost:8080/api/character/?page=1");
});

it("Test Different GetIndividualCharacterUrl(id)", () => {
    expect(UrlEndPointGenerator.GetIndividualCharacterUrl(2)).toBe("https://localhost:8080/api/character/2");
    expect(UrlEndPointGenerator.GetIndividualCharacterUrl(10)).toBe("https://localhost:8080/api/character/10");
});

it("Test Episode URL", () => {
    expect(UrlEndPointGenerator.GetEpisodesUrl()).toBe("https://localhost:8080/api/episode");
    expect(UrlEndPointGenerator.GetEpisodesUrl(2)).toBe("https://localhost:8080/api/episode/?page=2");
    expect(UrlEndPointGenerator.GetEpisodesUrl(10)).toBe("https://localhost:8080/api/episode/?page=10");
});