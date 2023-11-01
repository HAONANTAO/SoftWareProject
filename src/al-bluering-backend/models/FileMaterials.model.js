module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        url: {
					type: String,
          required: true
				},
        description: String,
        name: {
            type: String,
            required: true
        },
        lastModified: {
          type: Date,
          default: new Date(),
          required: true
        }
      },
      { timestamps: true }
    );
  
    schema.methods = {
        view() {
            return {
                url: this.url,
                description: this.description,
                name: this.name,
                lastModified: this.lastModified
            };
        }
    };
  
    const FileMaterials = mongoose.model("FileMaterials", schema);
    return FileMaterials;
  };
  