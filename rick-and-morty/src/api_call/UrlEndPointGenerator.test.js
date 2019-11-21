import UrlEndPointGenerator from "./UrlEndPointGenerator";

it("Base Endpoint is what we expect", () => {
    expect(UrlEndPointGenerator.BaseEndPointUrl()).toBe("https://rickandmortyapi.com/api");
});

it("Test Different GetCharactersUrl()", () => {
    expect(UrlEndPointGenerator.GetCharactersUrl()).toBe("https://rickandmortyapi.com/api/character");
    expect(UrlEndPointGenerator.GetCharactersUrl(2)).toBe("https://rickandmortyapi.com/api/character/?page=2");
    expect(UrlEndPointGenerator.GetCharactersUrl(10)).toBe("https://rickandmortyapi.com/api/character/?page=10");
});

it("Test Different GetIndividualCharacterUrl(id)", () => {
    expect(UrlEndPointGenerator.GetIndividualCharacterUrl(2)).toBe("https://rickandmortyapi.com/api/character/2");
    expect(UrlEndPointGenerator.GetIndividualCharacterUrl(10)).toBe("https://rickandmortyapi.com/api/character/10");
});