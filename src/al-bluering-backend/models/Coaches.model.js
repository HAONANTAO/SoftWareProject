const bcrypt = require('bcrypt');
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName:  {
					type: String,
					default: "firstName"
				},
        middleName:  {
					type: String,
					default: "middleName"
				},
        lastName:  {
					type: String,
					default: "lastName"
				},
        loginID:  {
					type: String,
          required: true,
          unique: true
				},
        password:  {
					type: String,
          required: true,
          select: false
				},
        age: Number,
        address: String,
        phone: String,
        description: {
					type: String,
					default: ""
				}
      },
      { timestamps: true }
    );
  
    // Hash password on save
    schema.pre('save', function password(next) {
      const rounds = 9;
      bcrypt.hash(this.password, rounds)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch(next);
    });

    // Hash password on update
    schema.pre('updateOne', async function updatePassword(next) {
      if (this._update.password == null) {
        // If the password is null or undefined, do nothing and proceed to the next middleware
        return next();
      }
      try {
        const rounds = 9;
        const hash = await bcrypt.hash(this._update.password, rounds);
        this._update.password = hash;
        next();
      } catch (error) {
        next(error);
      }
    });
  
    schema.methods = {
        view() {
            return {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                loginID: this.loginID,
                password: this.password,
                age: this.age,
                address: this.address,
                phone: this.phone
            };
        },
        authenticate(password) {
          return bcrypt.compare(password, this.password).then(valid => (valid ? this : false));
        }
    };
  
    const Coaches = mongoose.model("Coaches", schema);
    return Coaches;
  };
  