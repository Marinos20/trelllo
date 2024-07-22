<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="container mx-auto p-4 ">
      <h1 v-if="!loading" class="text-2xl font-bold text-center mb-6 mt-20 bg-gray-100 p-2 py-3 rounded-lg">Liste des
        Notes</h1>
      <section v-if="showDatas" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="note in notes" :key="note._id"
             class="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full relative transition-transform transform hover:scale-105">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold truncate">{{ note.title }}</h1>
            <p class="text-gray-500 truncate">ID: {{ note._id }}</p>
            <button class="text-gray-500" @click="togglePopup(note._id)">
              <svg height="1.8rem" viewBox="0 0 24 24" width="1.8rem" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
                    fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="mt-4 overflow-hidden flex-grow">
            <h2 class="text-lg font-semibold">Contenu:</h2>
            <ul class="list-disc pl-5 py-2 overflow-auto max-h-[10rem]">
              <li v-for="item in note.content" :key="item._id" class="text-gray-700">{{ item.substring(0, 50) }}</li>
            </ul>
          </div>
          <div class="mt-4 flex justify-between text-gray-500">
            <p>Créé le: {{ getFormattedDate(note.createdAt) }}</p>
            <p>Mis à jour le: {{ getFormattedDate(note.updatedAt) }}</p>
          </div>
          <div v-if="showPopup === note._id" class="absolute top-0 right-0 bg-white shadow-lg p-4 rounded-md ">
            <div class="flex flex-col justify-center items-center">
              <button class="bg-blue-500 text-white p-1 rounded-md w-fit mb-2" @click="openEditPopup(note._id)">
                <svg height="1.4rem" viewBox="0 0 24 24" width="1.4rem" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/>
                  </g>
                </svg>
              </button>
              <button class="bg-yellow-500 text-white p-1 rounded-md w-fit mb-2" @click="navigateToDetail(note._id)">
                <svg height="1.4rem" viewBox="0 0 20 20" width="1.4rem" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10m9.8 4a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-2a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                      fill="currentColor"/>
                </svg>
              </button>
              <button class="bg-red-500 text-white p-1 rounded-md w-fit mb-2" @click="confirmDelete(note._id)">
                <svg height="1.4rem" viewBox="0 0 48 48" width="1.4rem" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0m-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5zm4 9.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0zM27.75 19c-.69 0-1.25.56-1.25 1.25v14.5a1.25 1.25 0 1 0 2.5 0v-14.5c0-.69-.56-1.25-1.25-1.25"
                      fill="currentColor"/>
                </svg>
              </button>
              <button class="bg-red-500 text-white p-1 rounded-md w-fit mb-2" @click="togglePopup(note._id)">
                <svg height="1.4rem" viewBox="0 0 24 24" width="1.4rem" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path
                        d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path
                        d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                        fill="currentColor"/>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section v-if="!loading" class="flex justify-center mt-8" >
        <button :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 mx-2"
                @click="changePage('prev')">
          Précédent
        </button>
        <button :disabled="currentPage * notesPerPage >= totalNotes"
                class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 mx-2" @click="changePage('next')">
          Suivant
        </button>
      </section>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div class="loader"></div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[40%] mx-auto">
        <h2 class="text-xl font-bold mb-4">Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
        <div class="flex justify-end mt-4">
          <button class="bg-red-500 text-white px-4 py-2 rounded-md mr-2" @click="deleteNote">Supprimer</button>
          <button class="bg-gray-300 text-black px-4 py-2 rounded-md" @click="showDeleteConfirm = false">Annuler
          </button>
        </div>
      </div>
    </div>

    <!-- Modal pour les détails -->
    <div v-if="showPostDetail" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[40%] mx-auto">
        <h2 class="text-xl font-bold mb-4">{{ selectedNote?.title }}</h2>
        <p class="mb-4">ID: {{ selectedNote?._id }}</p>
        <h3 class="font-semibold">Contenu:</h3>
        <ul class="list-disc pl-5">
          <li v-for="item in selectedNote?.content" :key="item._id" class="text-gray-700">{{ item }}</li>
        </ul>
        <div class="flex justify-end">
          <button class="bg-red-500 text-white p-2 rounded-md mt-4" @click="closeDetailModal(selectedNote._id)">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal pour l'édition -->
    <div v-if="showEditPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[40%] mx-auto">
        <h2 class="text-xl font-bold mb-4 text-center">Modifier la note</h2>
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label class="block mb-2" for="edit-title">Titre</label>
            <input id="edit-title" v-model="editNoteData.title" class="border rounded-md w-full p-2" required
                   type="text"/>
          </div>
          <div class="mb-4">
            <label class="block mb-2" for="edit-content">Contenu</label>
            <textarea id="edit-content" v-model="contentInput" class="border resize-none rounded-md w-full p-2"
                      rows="4"></textarea>
            <button class="bg-green-500 text-white px-2 py-1 rounded mt-2" type="button" @click="addContent">Ajouter au
              contenu
            </button>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Contenu ajouté :</h3>
            <ul class="max-h-[10rem] mt-3 overflow-auto">
              <li v-for="(item, index) in editNoteData.content" :key="index"
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
          <div class="flex justify-between mt-8">
            <button class="bg-red-500 text-white px-4 py-2 rounded-md" type="button" @click="closeEditPopup">Fermer
            </button>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" type="submit">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const notes = ref([]);
const showDatas = ref(false);
const showPostDetail = ref(false);
const showEditPopup = ref(false);
const showDeleteConfirm = ref(false);
const currentPage = ref(1);
const notesPerPage = 9;
const totalNotes = ref(0);
const allNotes = ref([]);
const showPopup = ref(null);
const selectedNote = ref(null);
const editNoteData = ref({title: '', content: [], _id: ''});
const contentInput = ref('');
const loading = ref(false);

const getDatas = async () => {
  loading.value = true;
  try {
    const response = await fetch('https://post-it.epi-bluelock.bj/');
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    const data = await response.json();
    allNotes.value = data.notes;
    totalNotes.value = allNotes.value.length;
    paginateData();
    showDatas.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  } finally {
    loading.value = false;
  }
};

const paginateData = () => {
  const start = (currentPage.value - 1) * notesPerPage;
  const end = start + notesPerPage;
  notes.value = allNotes.value.slice(start, end);
};

const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'});
};

const changePage = (direction) => {
  if (direction === 'prev' && currentPage.value > 1) currentPage.value--;
  else if (direction === 'next' && currentPage.value * notesPerPage < totalNotes.value) currentPage.value++;
  paginateData();
};

const togglePopup = (noteId) => {
  if (showPopup.value === noteId) {
    showPopup.value = null;
    selectedNote.value = null;
  } else {
    showPopup.value = noteId;
    selectedNote.value = allNotes.value.find(note => note._id === noteId);
  }
};

const openEditPopup = (noteId) => {
  const noteToEdit = allNotes.value.find(note => note._id === noteId);
  editNoteData.value = {...noteToEdit};
  showEditPopup.value = true;
};

const confirmDelete = (noteId) => {
  showDeleteConfirm.value = true;
  selectedNote.value = noteId;
};

const deleteNote = async () => {
  showDeleteConfirm.value = false;
  loading.value = true;
  try {
    const response = await fetch(`https://post-it.epi-bluelock.bj/${selectedNote.value}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    allNotes.value = allNotes.value.filter(note => note._id !== selectedNote.value);
    totalNotes.value = allNotes.value.length;
    paginateData();
    showDeleteConfirm.value = false;
  } catch (error) {
    console.error('Erreur lors de la suppression de la note :', error);
  } finally {
    loading.value = false;
  }
};

const closeDetailModal = () => {
  showPostDetail.value = false;
};

const closeEditPopup = () => {
  showEditPopup.value = false;
  contentInput.value = '';
};

const submitEditForm = async () => {
  loading.value = true; // Activer le loader
  try {
    const response = await fetch(`https://post-it.epi-bluelock.bj/${editNoteData.value._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editNoteData.value)
    });

    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

    // Mettre à jour la liste des notes
    const index = allNotes.value.findIndex(note => note._id === editNoteData.value._id);
    if (index !== -1) {
      allNotes.value[index] = editNoteData.value;
    }

    totalNotes.value = allNotes.value.length;
    paginateData();
    closeEditPopup();
    showEditPopup.value = false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la note :', error);
  } finally {
    loading.value = false;
  }
};

// Fonction pour ajouter du contenu
const addContent = () => {
  if (contentInput.value) {
    editNoteData.value.content.push(contentInput.value);
    contentInput.value = '';
  }
};

// Fonction pour supprimer un contenu
const removeContent = (index) => {
  editNoteData.value.content.splice(index, 1);
};

onMounted(() => {
  getDatas();
});

const navigateToDetail = () => {
  showPostDetail.value = true;
};
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

