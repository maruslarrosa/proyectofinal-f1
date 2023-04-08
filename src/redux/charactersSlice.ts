import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseUrl = 'https://rickandmortyapi.com/api';

const apiGetCharacters = async (page: string) => {
  const url = page ? page : `${baseUrl}/character`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error, intentelo mas tarde');
  }
};

const apiGetFavoriteCharacters = async (favoriteIds: number[]) => {
  const favoriteParams = favoriteIds.join(',');
  const response = await fetch(`${baseUrl}/character${favoriteParams}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error, intentelo mas tarde');
  }
};

const apiGetFilteredCharacters = async (name: string) => {
  const url = name
    ? `${baseUrl}/character/?name=${name}`
    : `${baseUrl}/character`;
  const response = await fetch(url);
  if (response.ok) {
    {
      const data = await response.json();
      return data;
    }
  }
};

// will manage pagination options
export const getCharacters = createAsyncThunk(
  '/getCharacters',
  async (page: string = '') => {
    const response = await apiGetCharacters(page);
    return response;
  }
);

export const getFavoriteCharacters = createAsyncThunk(
  '/getFavoriteCharacters',
  async (favoriteIds: number[]) => {
    const response = await apiGetFavoriteCharacters(favoriteIds);
    return response;
  }
);

//will manage filter calls
export const getFilteredCharacters = createAsyncThunk(
  '/getFilteredCharacters',
  async (name: string) => {
    const response = await apiGetFilteredCharacters(name);
    return response;
  }
);

interface initialType {
  characters: [];
  favorites: number[];
  prev: string;
  next: string;
  filter: string;
}

const initialState: initialType = {
  characters: [],
  favorites: [],
  prev: '',
  next: '',
  filter: '',
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
    actionRemoveAllFavorites: (state) => {
      state.favorites = [];
    },
    actionSetPrev: (state, action) => {
      state.prev = action.payload;
    },
    actionSetNext: (state, action) => {
      state.next = action.payload;
    },
    actionSetFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.prev = action.payload.info.prev ? action.payload.info.prev : '';
      state.next = action.payload.info.next ? action.payload.info.next : '';
    });
    builder.addCase(getFavoriteCharacters.fulfilled, (state, action) => {
      state.characters =
        action.payload.length > 1 ? action.payload : [action.payload];
    });
    builder.addCase(getFilteredCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.results;
    });
  },
});

export const {
  actionGetCharacters,
  actionAddFavorite,
  actionRemoveFavorite,
  actionRemoveAllFavorites,
  actionSetNext,
  actionSetPrev,
  actionSetFilter,
} = characterSlice.actions;

export default characterSlice.reducer;
