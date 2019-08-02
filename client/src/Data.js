import Config from './Config';
import Axios from 'axios';
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, creds = null) {
    const url = Config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const token = creds;
      // edit headers to include JWT Token
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, options);
  }

  /** USER METHODS */

  //Login User, creates JWT Token and grabs user info
  async login(creds) {
    const response = await this.api('/login', 'POST', creds);

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return response
        .json()
        .then(data => console.log(data.errors))
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  // create users
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  // Update User
  async updateUser(token, user) {
    const response = await this.api('/users', 'PUT', user, true, token);
    if (response.status === 201) {
      return [];
    } else if (response.status === 403 || response.status === 400) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  // Delete User
  async deleteUser(token) {
    const response = await this.api(
      '/users',
      'DELETE',
      null,
      null,
      true,
      token
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  /** RESET PASSWORD METHODS */

  // sends user reset email password link via email
  forgotUserPassword = email =>
    Axios.post(`${Config.apiBaseUrl}/forgotpassword`, {
      email,
    });

  /** Allows user to update their password */

  async updateUserPassword(user) {
    const response = await this.api('/updatepasswordviaemail', 'PUT', user);

    if (response.status === 200) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    }
  }
  /** CONFIRM USER EMAIL METHODS */

  // sends conformation email to user
  sendConfirmUserEmail = email =>
    Axios.post(`${Config.apiBaseUrl}/email`, {
      email,
    });
  // when user clicks on conformation email
  confirmUserEmail = id =>
    Axios.get(`${Config.apiBaseUrl}/email/confirm/${id}`);

  /** CATEGORY METHODS */

  // createCategory
  async createCategory(title) {
    const response = await this.api('/category', 'POST', title);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  /** RECOMMENDATION METHODS */

  // create recommendation
  async createRecommendation(token, rec) {
    const response = await this.api('/recs', 'POST', rec, true, token);
    if (response.status === 201) {
      return [];
    } else if (response.status === 401 || response.status === 400) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('Something else went wrong');
    }
  }

  // Update Recommendation
  async updateRecommendation(token, rec, id) {
    const response = await this.api(`/recs/${id}`, 'PUT', rec, true, token);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  // Delete Recommendation

  async deleteRecommendation(token, id) {
    const response = await this.api(`/recs/${id}`, 'DELETE', null, true, token);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  /** RATING METHODS */

  // create rating

  async createRating(email, password, rating, id) {
    const response = await this.api(
      `/rating/recs/${id}`,
      'POST',
      rating,
      true,
      { email, password }
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }

  // update rating
  async updateRating(token, rating, id) {
    const response = await this.api(
      `/rating/recs/${id}`,
      'PUT',
      rating,
      true,
      token
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }
  // delete rating
  async deleteRating(token, id) {
    const response = await this.api(
      `/rating/recs/${id}`,
      'DELETE',
      null,
      true,
      token
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 403) {
      return response
        .json()
        .then(data => data.errors)
        .catch(err => console.log(err));
    } else {
      throw new Error();
    }
  }
}
