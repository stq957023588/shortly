<template>
  <div>
    <div class="px-4 md:px-24">
      <div class="flex justify-between items-center py-4">
        <h1 class="text-2xl font-bold">Links</h1>
        <VaButton color="primary" @click="openCreateDialog">Add Link</VaButton>
      </div>
      <VaInput v-model="search" placeholder="Search links..." class="mb-4 w-full" />

      <div class="space-y-4">
        <VaCard v-for="link in pagedLinks" :key="link.id" class="p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-start gap-4">
              <VaCheckbox v-model="selectedLinks" :array-value="link.id" class="mt-1" />
              <div class="flex flex-col gap-2 w-full">
                <h3 class="text-lg font-semibold">{{ link.title }}</h3>
                <div class="text-sm text-gray-600">
                  <div><strong>Short URL:</strong> <a :href="link.shortUrl" target="_blank" class="text-primary">{{ link.shortUrl }}</a></div>
                  <div><strong>Original URL:</strong> {{ link.longUrl }}</div>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500 pt-3 border-t mt-3 gap-4">
                  <div class="flex-1 whitespace-nowrap"><strong>Created:</strong> {{ link.createdAt }}</div>
                  <div class="flex-1 text-right whitespace-nowrap"><strong>Clicks:</strong> {{ link.clickCount }}</div>
                  <div class="flex-1 text-right whitespace-nowrap">
                    <strong>Tags:</strong>
                    <span v-if="link.tags">
                      {{ link.tags.join(', ') || 'None' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <VaButton size="small" icon="edit" @click="editLink(link)" />
              <VaButton size="small" icon="delete" color="danger" @click="deleteLink(link.id)" />
            </div>
          </div>
        </VaCard>
        <div ref="sentinel" class="h-8"></div>
      </div>
    </div>

    <VaModal v-model="isCreateDialogOpen" title="Create New Link">
      <VaForm @submit.prevent="submitNewLink">
        <VaInput v-model="newLink.title" label="Title" class="mb-2" />
        <VaInput v-model="newLink.longUrl" label="Long URL" class="mb-2" />
        <VaButton color="primary" type="submit" tag="button">Submit</VaButton>
      </VaForm>
    </VaModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { LinkItem } from '@/pages/links/types'

const search = ref('')
const isCreateDialogOpen = ref(false)
const selectedLinks = ref<string[]>([])

const links = ref<LinkItem[]>([
  {
    id: '1',
    title: 'Demo Link',
    shortUrl: 'https://bit.ly/abc123',
    longUrl: 'https://example.com/page',
    createdAt: '2025-05-16',
    clickCount: 35,
    tags: ['demo', 'example']
  },
  {
    id: '2',
    title: 'Vue 3 Docs',
    shortUrl: 'https://bit.ly/vue3doc',
    longUrl: 'https://vuejs.org',
    createdAt: '2025-05-15',
    clickCount: 120,
    tags: ['vue', 'docs']
  }
])

const newLink = ref({
  id: '',
  title: '',
  longUrl: '',
  shortUrl: '',
  createdAt: '',
  clickCount: 0,
  tags: []
})

const filteredLinks = computed(() => {
  return links.value.filter(link => link.title.toLowerCase().includes(search.value.toLowerCase()))
})

const page = ref(1)
const perPage = 10

const pagedLinks = computed(() => {
  return filteredLinks.value.slice(0, page.value * perPage)
})

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore()
    }
  }, {
    root: null,
    threshold: 1.0
  })
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => {
  if (sentinel.value) observer.unobserve(sentinel.value)
})

const loadMore = () => {
  const total = filteredLinks.value.length
  if (page.value * perPage < total) {
    page.value += 1
  }
}

const openCreateDialog = () => {
  isCreateDialogOpen.value = true
  newLink.value = {
    id: Date.now().toString(),
    title: '',
    longUrl: '',
    shortUrl: '',
    createdAt: new Date().toISOString().slice(0, 10),
    clickCount: 0,
    tags: []
  }
}

const submitNewLink = () => {
  newLink.value.shortUrl = 'https://bit.ly/' + Math.random().toString(36).substring(7)
  links.value.push({ ...newLink.value })
  isCreateDialogOpen.value = false
}

const editLink = (link: LinkItem) => {
  alert('Edit not implemented yet. Clicked on: ' + link.title)
}

const deleteLink = (id: string) => {
  links.value = links.value.filter(link => link.id !== id)
}
</script>

<style scoped>
.va-card {
  box-shadow: var(--va-box-shadow);
}
</style>
