module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        content: String,
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
                content: this.content,
                name: this.name,
                lastModified: this.lastModified
            };
        }
    };
  
    const TextureMaterials = mongoose.model("TextureMaterials", schema);
    return TextureMaterials;
  };
  