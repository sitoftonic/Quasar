<template>
  <ais-instant-search index-name="influencers" :search-client="searchClient">
    <div class="left-panel">
      <ais-clear-refinements />
      <h2>Brands</h2>
      <ais-refinement-list attribute="username" searchable />
      <ais-configure :hitsPerPage="8" />
    </div>
    <div class="right-panel">
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.name }}</h2>
        </div>
      </ais-hits>
      <ais-pagination />
    </div>
  </ais-instant-search>
</template>

<script>
  import algoliasearch from 'algoliasearch';
  import 'instantsearch.css/themes/algolia-min.css';
  import config from '../configs/config'

  const client = algoliasearch('DEU6JVL2BX', 'c7d905bb7d4c53105403b247f28bed02');
  const index = client.initIndex('influencers');

  index.setSettings({
    attributesForFaceting: [
      'searchable(username)'
    ]
  })

  export default {
    name: 'InfluencersSearch',
    data() {
      return {
        searchClient: algoliasearch(
          config.algolia_app_id,
          config.algolia_key
        ),
      };
    },
  }
</script>

<style scoped>
  .ais-Hits-list {
    margin-top: 0;
    margin-bottom: 1em;
  }

  .ais-InstantSearch {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 1em;
  }
</style>
