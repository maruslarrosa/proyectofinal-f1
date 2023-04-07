import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseUrl = 'https://rickandmortyapi.com/api';

const apiGetCharacters = async () => {
  const response = await fetch(baseUrl + '/character');
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error, intentelo mas tarde');
  }
};

const apiGetFavoriteCharacters = async (favoriteIds: number[]) => {
  const favoriteParams = favoriteIds.join(',');
  const response = await fetch(baseUrl + '/character/' + favoriteParams);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error, intentelo mas tarde');
  }
};

export const getCharacters = createAsyncThunk('/getCharacters', async () => {
  const response = await apiGetCharacters();
  return response;
});

export const getFavoriteCharacters = createAsyncThunk(
  '/getFavoriteCharacters',
  async (favoriteIds: number[]) => {
    const response = await apiGetFavoriteCharacters(favoriteIds);
    return response;
  }
);

interface initialType {
  characters: [];
  favorites: number[];
  prev: string;
  next: string;
}

const initialState: initialType = {
  characters: [],
  favorites: [],
  prev: '',
  next: '',
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
      state.favorites = state.favorites.filter((f) => f !== action.payload);
    },
    actionSetPrev: (state, action) => {
      state.prev = action.payload;
    },
    actionSetNext: (state, action) => {
      state.next = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.prev = action.payload.info.prev ? action.payload.info.prev : '';
      state.next = action.payload.info.next ? action.payload.info.next : '';
    });
    builder.addCase(getFavoriteCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
  },
});

export const {
  actionGetCharacters,
  actionAddFavorite,
  actionRemoveFavorite,
  actionSetNext,
  actionSetPrev,
} = characterSlice.actions;

export default characterSlice.reducer;
