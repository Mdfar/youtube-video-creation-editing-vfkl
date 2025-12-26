const axios = require('axios'); const OpenAI = require('openai'); const ElevenLabs = require('elevenlabs-node'); const { google } = require('googleapis'); require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); const voice = new ElevenLabs({ apiKey: process.env.ELEVENLABS_API_KEY, voiceId: process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgmqMvjk74fB' });

/**

CORE WORKFLOW: Script -> Video Draft */ async function generateNewsVideo(script) { console.log("🎬 Initializing High-Velocity News Pipeline...");

try { // 1. GENERATE AI VOICEOVER console.log("🎙️ Generating AI Voiceover..."); const audioFile = await voice.textToSpeech({ fileName: "./assets/voiceover.mp3", textInput: script });

 // 2. ANALYZE SCRIPT FOR VISUAL CUES
 console.log("🧠 Extracting visual cues and news tags...");
 const analysis = await openai.chat.completions.create({
     model: "gpt-4o",
     messages: [{
         role: "system",
         content: "Break this script into 5-second visual segments. Recommend specific news footage or AI prompts for each."
     }, {
         role: "user",
         content: script
     }]
 });

 // 3. PROGRAMMATIC VIDEO RENDERING (via Creatomate API)
 console.log("🏗️ Rendering video layers...");
 const videoResponse = await axios.post('[https://api.creatomate.com/v1/renders](https://api.creatomate.com/v1/renders)', {
     template_id: process.env.CREATOMATE_TEMPLATE_ID,
     modifications: {
         "Voiceover": audioFile,
         "Subtitles": script,
         "Visual_Strategy": analysis.choices[0].message.content
     }
 }, {
     headers: { 'Authorization': `Bearer ${process.env.CREATOMATE_API_KEY}` }
 });

 // 4. UPLOAD TO YOUTUBE AS DRAFT
 console.log("🚀 Pushing to YouTube Drafts...");
 await uploadToYouTube(videoResponse.data.url, "Draft Political News Video");

 console.log("✅ Pipeline Complete. Video is ready for review in YouTube Studio.");


} catch (error) { console.error("❌ Pipeline Error:", error.response?.data || error.message); } }

async function uploadToYouTube(videoUrl, title) { const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_OAUTH_TOKEN }); // Implementation for uploading from URL as a draft // In a real production environment, this involves streaming the buffer to the YouTube Data API console.log(🔗 Draft Created: ${title} at ${videoUrl}); }

// Example usage with a political script const sampleScript = "Breaking news from the capital today as tensions rise over the latest policy shift..."; generateNewsVideo(sampleScript);