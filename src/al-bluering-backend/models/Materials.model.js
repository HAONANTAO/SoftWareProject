module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        type: {
            type: String,
            required: true
        },
        fileMaterials:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FileMaterials"
        },
        textureMaterials:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TextureMaterials"
        },
        assessment:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessments"
        }
      },
      { timestamps: true }
    );
  
    schema.methods = {
        view() {
            return {
                type: this.type,
                fileMaterials: this.fileMaterials,
                textureMaterials: this.textureMaterials,
                assessment: this.assessment
            };
        }
    };
  
    const Materials = mongoose.model("Materials", schema);
    return Materials;
  };
  