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
      options.headers['Authoriztion'] = `Basic ${endcodedCreds}`;
    }

    return fetch(url, options);
  }

  //get users
  async getUser(email, password) {
    const response = await this.api('/users', 'GET', null, true, {
      email,
      password,
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
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
      return response.json().then(data => {
        return data.errors;
      });
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
      return response.json().then(data => {
        return data.errors;
      });
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
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // create recommendation
  async createRecommendation(email, password, info) {
    const response = await this.api('/recs', 'POST', info, true, {
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
}
