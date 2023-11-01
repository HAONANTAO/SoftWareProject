module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
            unique: true
        },
        father_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Modules'
        },
        // level of the module
        // 1: main-module -> materials = null
        // 2: sub-module -> materials = null
        // 3: third level-module
        level: {
            type: Number,
            required: true
        },
        materials: [
            {
                // Store the material type ("file", "assessment" or "texture")
                materialType: String,
                id : Number,
                material: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Material'
                }
            }
        ]
      },
      { timestamps: true }
    );
  
    schema.methods = {
        view() {
            return {
                name: this.name,
                Materials: this.Materials
            };
        }
    };
  
    const Modules = mongoose.model("Modules", schema);
    return Modules;
  };
  