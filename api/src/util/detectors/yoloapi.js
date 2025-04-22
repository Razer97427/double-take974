// api/src/util/detectors/yoloapi.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

module.exports = {
  // Adapter la signature selon le modèle suivi par les autres fichiers,
  // La plupart exposent .detect(image, options)
  detect: async (image, options = {}) => {
    try {
      const apiUrl = options.host || 'http://localhost:5000/detect';
      const form = new FormData();
      form.append('file', fs.createReadStream(image));

      const response = await axios.post(apiUrl, form, { headers: form.getHeaders() });

      // Exemple de parsing pour avoir un format commun avec Double Take
      const results = response.data.detections.map(obj => ({
        name: obj.label,
        confidence: obj.confidence
        // Ajoute d'autres champs si besoin
      }));

      return {
        success: true,
        results: results
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
};
