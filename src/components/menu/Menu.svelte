<script>
  import menu from './menu'

  export let segment = ''
  const getUrl = (url) => {
    if (!url) {
      return '/'
    }
    return url
  }
</script>

<aside class="column is-2 aside">
  <nav class="menu">
    {#each menu as item (item.id)}
      <p class="menu-label">{item.label}</p>
      <ul class="menu-list">
        {#each item.links as list (list.id)}
          <li><a href="{list.link}" rel="prefetch" class="{getUrl(segment) === list.link ? 'is-active' : ''}">{list.name}</a></li>
        {/each}
      </ul>
    {/each}
  </nav>
</aside>

<style>
  .aside {
    padding: 2em 0.2em 0 1em;
  }
</style>
