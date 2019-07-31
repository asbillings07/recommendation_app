'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
    },
    photo: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    tokenExpires: {
      type: DataTypes.DATE,
    },
  });
  User.associate = models => {
    User.hasMany(models.Recommendation, {
      foreignKey: {
        fieldName: 'userid',
      },
    });
    User.hasMany(models.Rating, {
      as: 'userRating',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });
    User.hasMany(models.SavedRec, {
      as: 'userSavedRecs',
      foreignKey: {
        fieldName: 'userid',
        allowNull: false,
      },
    });
    User.belongsToMany(models.Recommendation, { through: 'SavedRec' });
    User.hasOne(models.Sessions, {
      as: 'session',
      foreignKey: {
        fieldName: 'userid',
      },
    });
  };
  return User;
};

/*
module.exports = function(sequelize, DataTypes) {
  var
    User;

  User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      company: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set: function (plain_password) {
          this.setDataValue('salt', crypto.randomBytes(saltLength).toString('hex'));
          this.setDataValue('password', this.encryptPassword(plain_password));
          this.token = User.generateToken();
        }
      },
      tempPassword: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM('new', 'confirmed', 'active', 'disabled'),
        defaultValue: 'new'
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      salt: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING,
        set: function (newToken) {
          this.setDataValue('token', newToken);
          this.tokenCreatedAt = Date.now();
        }
      },
      tokenCreatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      instanceMethods: {
        encryptPassword: function (plain) {
          return crypto.createHmac('sha1', this.salt).update(plain).digest('hex');
        },
        isTokenOutdated: function() {
          var
            currentDate = new Date(),
            tokenAge = (currentDate - this.tokenCreatedAt) / 1000;

          return tokenAge > config.authorization.token_out_of_date;
        },
        createToken: function () {

          if (!this.token || this.isTokenOutdated()) {
            this.token = User.generateToken();
            this.save();
          }

          return this.token;
        },
        removeAvatar: function() {
          if (this.avatar) {
            fs.unlink(pathService.absFile(user.avatar), function(err) {
              // doing nothing
            });
          }
        }
      },
      classMethods: {
        createNewUser: function(user) {
          return User.create({
            name: user.name,
            company: user.company,
            email: user.email,
            password: this.generatePassword(),
            tempPassword: this.generatePassword()
          });
        },
        generatePassword: function() {
          return crypto.randomBytes(tempPasswordLength).toString('hex');
        },
        generateToken: function() {
          return crypto.randomBytes(tokenLength).toString('hex');
        },
        authorization: function(email, password, done) {
          User.findOne({
            where: {
              email: email
            }
          }).then(function(foundUser) {
            if (!foundUser) {
              done('User not found')
            } else if (foundUser.status === 'confirmed' && foundUser.tempPassword === password) {
              done(null, {
                confirmed: true,
                token: foundUser.createToken()
              });
            } else if (foundUser.password !== foundUser.encryptPassword(password)) {
              done('Incorrect password');
            } else if (foundUser.status !== 'active') {
              done('This user isn\'t confirmed by admin or account has been locked');
            } else {
              done(null, {
                name: foundUser.name,
                email: foundUser.email,
                isAdmin: foundUser.isAdmin,
                token: foundUser.createToken()
              });
            }
          }, done);
        },
        authByToken: function(token, done) {
          User.findOne({
            where: {
              token: token
            }
          }).then(function(foundUser) {
            return done(null, (!foundUser || foundUser.isTokenOutdated()) ? false : foundUser);
          }, done);
        },
        findByToken: function(token) {
          return User.findOne({
            where: {
              token: token
            }
          });
        },
        associate: function (models) {
          User.hasMany(models.Client);
        }
      },
      hooks: {
        beforeDestroy: function(user) {
          user.removeAvatar();
        }
      }
    });

  return User;
};
*/
