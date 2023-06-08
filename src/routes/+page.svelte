<script>
// @ts-nocheck

    /**
	 * @type {any}
	 */
    let url;

    async function getUrl() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        url = tab.url;
    }
</script>


<button on:click={getUrl}>Reveal current Url</button>
{#if url}
    <div>
        The current url is: {url}
    </div>
{/if}