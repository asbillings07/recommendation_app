import Config from './Config'
import Axios from 'axios'
const env = Config.env
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, creds = null) {
    const url = `${Config[env].apiBaseUrl}${path}`

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
      // withCredentials: true
    }

    if (body !== null) {
      options.data = JSON.stringify(body)
    }

    if (requiresAuth) {
      const token = creds
      // edit headers to include JWT Token
      options.headers.Authorization = `Bearer ${token}`
    }

    return Axios(url, options)
  }

  /** USER METHODS */

  // Login User, creates JWT Token and grabs user info
  async login(creds) {
    const res = await this.api('/login', 'POST', creds)

    if (res.status === 200) {
      return res.data
    } else if (res.status === 401) {
      return res
    } else {
      throw new Error()
    }
  }

  // create users
  async createUser(user) {
    const res = await this.api('/users', 'POST', user)
    if (res.status === 201 || res.status === 200) {
      return []
    } else if (res.status === 400) {
      return res.errors
    } else {
      throw new Error()
    }
  }

  // Update User
  async updateUser(token, user) {
    const res = await this.api('/users', 'PUT', user, true, token)
    if (res.status === 204 || res.status === 200) {
      return []
    } else if (res.status === 403 || res.status === 400) {
      return res
    } else {
      throw new Error()
    }
  }

  // Update User Photo

  async updateUserPhoto(token, photoData) {
    const res = await this.api('/userphoto', 'POST', photoData, true, token)
    if (res.status === 204 || res.status === 201) {
      return []
    } else if (res.status === 400) {
      return res
    } else {
      throw new Error('Something else went wrong')
    }
  }

  // Delete User
  async deleteUser(token) {
    const res = await this.api('/users', 'DELETE', null, null, true, token)
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  /** RESET PASSWORD METHODS */

  // sends user reset email password link via email
  async forgotUserPassword(email) {
    const res = await this.api('/forgotpassword', 'POST', email)
    if (res.status === 200 || res.status === 201) {
      return res
    } else if (res.status === 400 || res.status === 403) {
      return res
    }
  }

  /** Allows user to update their password */

  async updateUserPassword(user) {
    const res = await this.api('/updatepasswordviaemail', 'PUT', user)

    if (res.status === 200) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    }
  }
  /** CONFIRM USER EMAIL METHODS */

  // sends conformation email to user
  async sendConfirmUserEmail(email) {
    const res = await Axios.post(`${Config[env].apiBaseUrl}/email`, email)
    if (res.status === 200 || res.status === 201) {
      return res
    } else if (res.status === 400 || res.status === 403) {
      return res
    }
  }

  // when user clicks on conformation email
  async confirmUserEmail(id) {
    const res = await this.api(`/email/confirm/${id}`)
    if (res.status === 200 || res.status === 201) {
      return res
    } else if (res.status === 400 || res.status === 403) {
      return res
    }
  }

  /** CATEGORY METHODS */

  // get Category

  async getCategoryById(id) {
    const res = await this.api(`/category/${id}`)
    if (res.status === 200) {
      return res.data
    } else if (res.status === 400) {
      return res
    } else {
      throw new Error()
    }
  }

  // createCategory
  async createCategory(title) {
    const res = await this.api('/category', 'POST', title)
    if (res.status === 201) {
      return []
    } else if (res.status === 400) {
      return res
    } else {
      throw new Error()
    }
  }

  /** RECOMMENDATION METHODS */

  // create recommendation
  async createRecommendation(token, rec, id) {
    const res = await this.api(`/recs/category/${id}`, 'POST', rec, true, token)
    if (res.status === 201) {
      return []
    } else if (res.status === 401 || res.status === 400) {
      return res
    } else {
      console.log('Something else went wrong')
    }
  }

  // Update Recommendation
  async updateRecommendation(token, rec, id) {
    const res = await this.api(`/recs/${id}`, 'PUT', rec, true, token)
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  // Delete Recommendation

  async deleteRecommendation(token, id) {
    const res = await this.api(`/recs/${id}`, 'DELETE', null, true, token)
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  /** RATING METHODS */

  // create rating

  async createRating(token, rating, id) {
    const res = await this.api(
      `/rating/recs/${id}`,
      'POST',
      rating,
      true,
      token
    )
    if (res.status === 201 || res.status === 200) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  // update rating
  async updateRating(token, rating, id) {
    const res = await this.api(`/rating/recs/${id}`, 'PUT', rating, true, token)
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }
  // delete rating

  async deleteRating(token, id) {
    const res = await this.api(
      `/rating/recs/${id}`,
      'DELETE',
      null,
      true,
      token
    )
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  /** Comment Methods */

  async createComment(token, id, comment) {
    const res = await this.api(
      `/rec/${id}/comment`,
      'POST',
      comment,
      true,
      token
    )
    if (res.status === 201) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  async updateComment(token, id, comment) {
    const res = await this.api(
      `/rec/${id}/comment`,
      'PUT',
      comment,
      true,
      token
    )
    if (res.status === 201) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }

  async deleteComment(token, id) {
    const res = await this.api(
      `/rec/${id}/comment`,
      'DELETE',
      null,
      true,
      token
    )
    if (res.status === 204) {
      return []
    } else if (res.status === 400 || res.status === 403) {
      return res
    } else {
      throw new Error()
    }
  }
}
