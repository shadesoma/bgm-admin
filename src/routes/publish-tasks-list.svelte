<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { createListsForAll, getThemeList } from '../services/api-requests/api-requests'
  import { themesList } from '../store/store'

  let theme: string = ''
  let listName: string = ''
  let helpMessage: boolean = false
  let helpText: string = ''
  let error = false

  const submitHandler = async () => {
    const res = await createListsForAll(theme, listName)
    if (res.result) {
      error = false
      helpText = 'List published!'
      listName = ''
      theme = ''
      helpMessage = true
      setTimeout(() => {
        helpMessage = false
      }, 2000)
    } else {
      helpMessage = true
      error = true
      helpText = res.error
    }
  }

  onMount(async () => {
    themesList.set(await getThemeList())
  })
</script>

<svelte:head>
  <title>Publish tasks list</title>
</svelte:head>

<h3 class="title is-3">Опубликовать бланк с задачами</h3>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
  <fieldset class="fieldset mr-2">
    <!-- Select Basic -->
    <div class="field is-horizontal">
      <div class="field">
        <label class="label" for="topic">Выберите тему</label>
        <div class="control">
          <div class="select">
            <select id="topic" name="topic" bind:value="{theme}" required>
              {#if $themesList}
                <option selected disabled></option>
                {#each $themesList as theme (theme.id)}
                  <option value="{theme.id}">{theme.name}</option>
                {/each}
              {:else}
                <option disabled>Добавьте тему</option>
              {/if}
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Text input-->
    <div class="field mb-5">
      <label class="label" for="task-list-name">Заголовок бланка</label>
      <div class="control">
        <input id="task-list-name" name="task-list-name" type="text" placeholder="заголовок" class="input" bind:value="{listName}" required />
      </div>
    </div>

    <!-- Button -->
    <div class="field mb-5">
      <label class="label" for="submit"></label>
      <div class="control">
        <button id="submit" name="submit" type="submit" class="button is-success">Опубликовать</button>
        {#if helpMessage}
          <p transition:fade="{{ duration: 250 }}" class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">{helpText}</p>
        {/if}
      </div>
    </div>
  </fieldset>
</form>
