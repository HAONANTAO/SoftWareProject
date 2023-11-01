module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true
        },
        coaches: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coaches"
          }
        ],
        // third-level modules
        modules: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modules"
          }
        ]
      },
      { timestamps: true }
    );
  
    schema.methods = {
        view() {
            return {
                name: this.name,
                coaches: this.coaches,
                modules: this.modules
            };
        }
    };
  
    const Classes = mongoose.model("Classes", schema);
    return Classes;
  };
  