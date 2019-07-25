import Config from './Config';

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
      const endcodedCreds = btoa(`${creds.email}:${creds.password}`);
      options.headers['Authorization'] = `Basic ${endcodedCreds}`;
    }

    return fetch(url, options);
  }

  /** USER METHODS */

  //get users
  async getUser(email, password) {
    const response = await this.api('/users', 'GET', null, true, {
      email,
      password,
    });

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
  async updateUser(email, password, user) {
    const response = await this.api('/users', 'PUT', user, true, {
      email,
      password,
    });
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
  async deleteUser(email, password) {
    const response = await this.api('/users', 'DELETE', null, true, {
      email,
      password,
    });
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
  async createRecommendation(email, password, rec) {
    const response = await this.api('/recs', 'POST', rec, true, {
      email,
      password,
    });
    if (response.status === 201) {
      return response.headers;
    } else if (response.status === 401 || response.status === 400) {
      return response
        .json()
        .then(data => {
          return data.errors;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('Something else went wrong');
    }
  }

  // Update Recommendation
  async updateRecommendation(email, password, rec, id) {
    const response = await this.api(`/recs/${id}`, 'PUT', rec, true, {
      email,
      password,
    });
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

  async deleteRecommendation(email, password, id) {
    const response = await this.api(`/recs/${id}`, 'DELETE', null, true, {
      email,
      password,
    });
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
  async updateRating(email, password, rating, id) {
    const response = await this.api(`/rating/recs/${id}`, 'PUT', rating, true, {
      email,
      password,
    });
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
  async deleteRating(email, password, rating, id) {
    const response = await this.api(
      `/rating/recs/${id}`,
      'DELETE',
      null,
      true,
      { email, password }
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
