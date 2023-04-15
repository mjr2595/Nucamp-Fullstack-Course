import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const userSignup = createAsyncThunk(
    'user/signup',
    async ({ username, password }, { dispatch }) => {
        const response = await fetch(baseUrl + 'user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        if (data.success) {
            dispatch(userLogin({ username, password }));
        }
        return data;
    }
);

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { dispatch }) => {
        const response = await fetch(baseUrl + 'user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        dispatch(setCurrentUser(data));
        return data;
    }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    const response = await fetch(baseUrl + 'user/logout', {
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    });

    // Remove the token on client side no matter what happens with the fetch
    localStorage.removeItem('token');

    if (!response.ok) {
        return Promise.reject(
            'There was a problem with logging out on the server side, status: ' +
                response.status
        );
    }

    const data = await response.json();
    return data;
});

export const validateLogin = createAsyncThunk(
    'user/validateLogin',
    async (values, { dispatch }) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(baseUrl + 'user/checkJWTtoken', {
            headers: {
                Authorization: bearer,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();

        if (!data.success) {
            dispatch(clearCurrentUser());
        }

        return data;
    }
);

export const postFavorite = createAsyncThunk(
    'user/postFavorite',
    async (favorite) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(baseUrl + 'user/favorites', {
            method: 'POST',
            body: JSON.stringify({ campsiteId: favorite }),
            headers: {
                Authorization: bearer,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        return data;
    }
);

export const deleteFavorite = createAsyncThunk(
    'user/deleteFavorite',
    async (favorite) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(baseUrl + 'user/favorites', {
            method: 'DELETE',
            body: JSON.stringify({ campsiteId: favorite }),
            headers: {
                Authorization: bearer,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        return data;
    }
);

// initial values for user slice of state
const initialState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    favorites: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.id;
        },
        clearCurrentUser: (state) => {
            state.isAuthenticated = false;
            state.favorites = [];
            state.isLoading = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.isLoading = true;
            state.favorites = [];
            localStorage.removeItem('token');
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.favorites = action.payload.favorites;
            localStorage.setItem('token', action.payload.token);
            console.log(
                `Login successful for user with _id: ${action.payload.id}`
            );
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.favorites = [];
            localStorage.removeItem('token');
            alert('Login failed.', action.error.message);
        },
        [userLogout.fulfilled]: (state) => {
            state.isLoading = false;
            state.favorites = [];
        },
        [userLogout.rejected]: (state) => {
            state.isLoading = false;
            state.favorites = [];
        },
        [userSignup.pending]: (state) => {
            state.isLoading = true;
        },
        [userSignup.rejected]: (state) => {
            state.isLoading = false;
            state.favorites = [];
        },
        [postFavorite.rejected]: (state, action) => {
            alert(
                'Your favorite could not be saved\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        },
        [postFavorite.fulfilled]: (state, action) => {
            state.favorites.push(action.payload);
        },
        [deleteFavorite.fulfilled]: (state, action) => {
            state.favorites = action.payload;
        },
        [deleteFavorite.rejected]: (state, action) => {
            alert(
                'Your favorite could not be deleted\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        }
    }
});

export const userReducer = userSlice.reducer;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
};

export const selectCurrentUserFavorites = (state) => {
    return state.user.favorites;
};
