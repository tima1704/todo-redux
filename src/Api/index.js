export class Module {
  static async GetPokemonBody(url, data) {
    fetch(url).then((res) => res.json().then(data));
  }

  static async GetPokemon(response, setPokemon) {
    response.map(async (item) => {
      const result = await fetch(item.url).then((res) => res.json());

      setPokemon((state) => {
        state = [...state, result];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  }
}
