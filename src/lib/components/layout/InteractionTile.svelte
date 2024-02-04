<script lang="ts">
  export let avatar = "";
  export let sender = "";
  export let role = "";
  export let code = "";
</script>

{#if role === "user"}
  <li>
    <div class="relative pb-14">
      <div class="relative flex items-start space-x-3">
        <div class="relative">
          <img
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            src={avatar}
            alt=""
          />

          <span
            class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
          >
            <!-- Heroicon name: mini/chat-bubble-left-ellipsis -->
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <div>
            <div class="text-sm">
              <span class="font-medium text-gray-900">{sender}</span>
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-700">
            <p>
              <slot />
            </p>
          </div>
        </div>
      </div>
    </div>
  </li>
{:else}
  <li class="text-right">
    <div class="relative pb-14">
      <div class="relative flex items-start space-x-3 justify-end">
        <div class="min-w-0 flex-1">
          <div>
            <div class="text-sm">
              <span class="font-medium text-gray-900">{sender}</span>
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-700">
            <p>
              <slot />
            </p>
          </div>
        </div>
        <div class="relative">
          <img
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            src={avatar}
            alt=""
          />

          <span
            class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
          >
            <!-- Heroicon name: mini/chat-bubble-left-ellipsis -->
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </li>
{/if}
