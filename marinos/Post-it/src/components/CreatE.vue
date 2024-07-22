<template>
  <div class="fixed inset-0 flex items-center justify-center bg-opacity-50">
    <div class="p-6 rounded-lg shadow-lg w-full max-w-md mx-auto bg-gray-100">
      <h2 class="text-xl font-bold mb-4 text-center">Créer une nouvelle note</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block mb-2" for="title">Titre</label>
          <input id="title" v-model="newNote.title" class="border rounded-md w-full p-2" required type="text"/>
        </div>
        <div class="mb-4">
          <label class="block mb-2" for="content">Contenu</label>
          <textarea id="content" v-model="contentInput" class="border resize-none rounded-md w-full p-2"
                    rows="4"></textarea>
          <button class="bg-green-500 text-white px-2 py-1 rounded mt-2" type="button" @click="addContent">Ajouter au
            contenu
          </button>
        </div>
        <div class="mb-4">
          <h3 class="font-semibold">Contenu ajouté :</h3>
          <ul class="max-h-[10rem] mt-3 overflow-auto">
            <li v-for="(item, index) in newNote.content" :key="index"
                class="flex justify-between items-center mb-2 border border-gray-300 rounded-md p-2 shadow">
              <span>{{ item }}</span>
              <button class="text-red-500 hover:text-red-700" @click="removeContent(index)">
                <svg height="1rem" viewBox="0 0 24 24" width="1rem" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path
                        d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path
                        d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                        fill="currentColor"/>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        <div class="flex justify-between items-center mt-4">
          <button class="bg-red-500 text-white px-4 py-2 rounded-md" type="button" @click="toggleFormPopup">Fermer
          </button>
          <button :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" type="submit">Ajouter
          </button>
        </div>
      </form>
    </div>

    <!-- Loader Overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="flex flex-col items-center">
        <div class="loader"></div>
        <span class="text-white mt-2">Chargement...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {v4 as uuidv4} from 'uuid';
import router from "@/router/index.js";

const newNote = ref({
  _id: '',
  title: '',
  content: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const contentInput = ref('');
const errorMessage = ref('');
const loading = ref(false);

const addContent = () => {
  if (contentInput.value) {
    newNote.value.content.push(contentInput.value);
    contentInput.value = '';
    errorMessage.value = '';
  }
};

const removeContent = (index) => {
  newNote.value.content.splice(index, 1);
};

const submitForm = async () => {
  if (newNote.value.content.length === 0) {
    errorMessage.value = 'Veuillez ajouter au moins un contenu avant de soumettre.';
    return;
  }

  loading.value = true;

  try {
    newNote.value._id = uuidv4();

    const response = await fetch('http://62.72.5.95:1999/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote.value)
    });

    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

    newNote.value = {
      _id: '',
      title: '',
      content: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    router.push("/");
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note :', error);
  } finally {
    loading.value = false;
  }
};

const toggleFormPopup= () => {
  router.push("/")
}
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
