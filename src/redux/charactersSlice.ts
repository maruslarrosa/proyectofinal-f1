import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from '../types.ts/character.types';
import produce from 'immer';

const apiGetCharacters = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  if (response.ok) {
    const data = await response.json();
    // const results: Character[] = data.response.results.map((c: any) => {
    //   return {
    //     id: c.id,
    //     name: c.name,
    //     image: c.image,
    //   };
    // });
    return data.results;
  } else {
    throw new Error('Error, intentelo mas tarde');
  }
};

export const getCharacters = createAsyncThunk('/getCharacters', async () => {
  const response = await apiGetCharacters();
  return response;
});

interface initialType {
  characters: [];
  favorites: number[];
}

const initialState: initialType = {
  characters: [],
  favorites: [],
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    actionGetCharacters: (state, action) => {
      state.characters = action.payload;
    },
    actionAddFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    actionRemoveFavorite: (state, action) => {
      //const index = state.favorites.indexOf(action.payload.id)
      state.favorites = state.favorites.filter((f) => f !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
  },
});

export const { actionGetCharacters, actionAddFavorite, actionRemoveFavorite } =
  characterSlice.actions;

export default characterSlice.reducer;
