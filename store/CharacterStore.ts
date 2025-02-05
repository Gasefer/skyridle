import { defineStore } from "pinia";

interface Character {
  name: string;
  [key: string]: any;
}

interface CharacterState {
  characters: Character[];
  randomCharacter: Character | null;
  tableCharacters: Character[];
  lastUpdated: string | null;
}

export const useCharacterStore = defineStore("characterStore", {
  state: (): CharacterState => ({
    characters: [],
    randomCharacter: null,
    tableCharacters: [],
    lastUpdated: null,
  }),
  actions: {
    setCharacters(characters: Character[]) {
      this.characters = characters;
      this.loadRandomCharacter();
    },
    addCharacterToTable(character: Character) {
      const index = this.characters.findIndex((c) => c.name === character.name);
      if (index !== -1) {
        this.characters.splice(index, 1);
      }
      this.tableCharacters.push(character);
    },
    loadRandomCharacter() {
      const today = new Date().toISOString().split("T")[0];
      if (this.lastUpdated !== today || !this.randomCharacter) {
        this.randomCharacter =
          this.characters.length > 0
            ? this.characters[
                Math.floor(Math.random() * this.characters.length)
              ]
            : null;
        this.lastUpdated = today;
      }
    },
  },
});
