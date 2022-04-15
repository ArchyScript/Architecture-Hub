
<template lang="">
    <div>
        <!-- 

            
            <!-- component -->
<!--
 I have costumized the public/styles.css file
  to remove the overflow and made a new class for the orage color
    the class name is border-orange , text-orange and the bg-orange

        <!-- component
<nav id="header" class="w-full z-30   bg-white shadow-lg border-b border-gray-300 ">
      <div class="w-full flex items-center justify-between mt-0 px-6 py-0">
         <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
                <div class="inline-flex">
                    <!-- Logo
                     <div class="mx-auto h-10  pt-4 w-auto pr-10">
                 <svg class="w-8 h-8 text-orange" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
        </svg>
        <!--end logo
                     </div>
                </div>
                <div class="inline-flex">
               <ul class="md:flex items-center justify-center text-base text-gray-400  md:pt-0">
                  <li><a class="inline-block no-underline hover:text-black font-medium text-md text-gray-800 py-2 px-4 lg:-ml-2" href="#">Inbox</a></li>
                  <li><a class="inline-block no-underline hover:text-gray-700 font-medium text-md py-2 px-4 lg:-ml-2" href="#">
                  Calender</a></li>
                  <li><a class="inline-block no-underline hover:text-gray-700  font-medium text-md py-2 px-4 lg:-ml-2" href="#">
                  Concierge</a></li>
                  <li><a class="inline-block no-underline hover:text-gray-700  font-medium text-md py-2 px-4 lg:-ml-2" href="#">
                  Events</a></li>
                  <li><a class="inline-block no-underline hover:text-gray-700  font-medium text-md py-2 px-4 lg:-ml-2" href="#">
                  Reports</a></li>
               </ul>
           </div>
            </nav>
         </div>

      </div>
   </nav>


    <div x-data="{ sidebarOpen: false, darkMode: false }" :class="{ 'dark': darkMode }">
        <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
            <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false"
                class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>

            <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
                class="scrollbar border-r-2 border-gray-300 fixed z-30 inset-y-0 left-0 w-52 transition duration-300 transform bg-white dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
                <div class="flex items-center justify-center mt-6">
                    <div class="flex items-center">
                              <button  class="flex bg-orange shadow-sm p-1 px-8 -ml-2 rounded-md text-white dark:text-white text-sm text-lg">
                                <span class="inline-flex mt-1 mr-2">
                                <svg class="h-5 w-5  text-gray-100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                    <a href="#" class="inline-flex text-gray-100"> New Email</a>
                    </button>
                    </div>
                </div>

                <nav class="flex flex-col mt-8 px-4 text-center">
                    <!-- inbox
                    <a href="#" class=" border-red-400 relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-2 border-transparent pr-6">
            <span class="inline-flex justify-center items-center ml-4">

              <svg class="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>

            </span>
            <span class="ml-2 text-md tracking-wide text-red-500">Inbox</span>
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-orange bg-red-50 rounded-full">12</span>
          </a>
          <!-- end inbox
          <!--starred
                       <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">

                    <svg class="mx-1 w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>

            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600 text-base">Starred</span>

          </a>
<!--end of starred
<!-- start of snooze
                         <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">

                   <svg  class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <polyline points="12 7 12 12 15 15"></polyline>
                </svg>

            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600 text-base">Snoozed</span>

          </a>
                        <!--end of snooze
                        <!-- start of sent

                         <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">

                    <svg class="w-5 h-5 transform text-gray-400 rotate-45 -mr-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600 text-base">Sent</span>

          </a>
                        <!-- end of sent
                        <!-- start of draft

                         <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">
                    <svg class="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                    </svg>
            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600 text-base">Draft</span>

          </a>
                <!-- end of draft
                <!-- start of spam
                            <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">
    <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-exclamation border-2 border-gray-400 rounded-full text-gray-400" fill="currentColor" >
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
        </svg>
            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600  text-base">Spam</span>

          </a>
                        <!-- end of spam
                        <!-- start of bin
                                       <a href="#" class=" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800   pr-6">
            <span class="inline-flex justify-center items-center ml-4">
   <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-exclamation border-2 border-gray-400 rounded-full text-gray-400" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </span>
            <span class="ml-2 text-md tracking-wide text-gray-600  text-base">Bin</span>

          </a>
<!-- end of bin
                        <hr class="mt-2">
                        <!--start of labels

                          <a href="#" class="  relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800  border-transparent pr-6">
            <span class="inline-flex justify-center items-center ml-4">

              <!-- labels logo
              <svg class="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                        </path>
                    </svg>

            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Labels</span>
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-gray-400 bg-gray-200 rounded-full">4</span>
          </a>
<!--end of logo
<div class="pt-20 flex justify-between">
    <!-- user images
<div class="flex -space-x-2 ml-2 overflow-hidden inline-flex">
  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="">
</div>
<!-- end of user images
<button class="inline-flex">
 <button class="appearance-none ml-2 px-2 py-1 border-2 border-gray-300 rounded-full  flex-1 flex items-center justify-center  text-center text-red hover:bg-grey-lighter">
                                <!-- the like svg
                                <svg class=" h-4 " version="1.1" viewBox="0 0 496.158 496.158" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">
                                    <path d="M0,248.085C0,111.063,111.069,0.003,248.075,0.003c137.013,0,248.083,111.061,248.083,248.082
                                        c0,137.002-111.07,248.07-248.083,248.07C111.069,496.155,0,385.087,0,248.085z" style="fill:#E04F5F;">
                                    </path>
                                    <path d="M374.116,155.145c-34.799-34.8-91.223-34.8-126.022,0h-0.029c-34.801-34.8-91.224-34.8-126.023,0
                                        c-34.801,34.8-29.783,86.842,0,126.022c31.541,41.491,89.129,109.944,126.023,109.944h0.029c36.895,0,94.481-68.453,126.022-109.944
                                        C403.9,241.988,408.916,189.946,374.116,155.145z" style="fill:#FFFFFF;">
                                    </path>

                                </svg>
                    <span class="text-gray-500 ml-2 text-md font-lg">
                        156
                    </span>
                            </button>
                            <!-- end of the like svg
</button>

    </div>
<span class="text-gray-500 mt-4">
    A small text here
</span>
<span class="font-semibold text-gray-500 ">
    untitled
</span>
    <hr class="mt-2 border-1 border-gray-300">

    <button class="flex justify-center ">
<span  class="font-lg pt-3 px-3">&#10096;</span>
<span class="font-lg pt-3">Hide menu</span>
</button>

                </nav>
            </div>

            <div class="flex-1 flex flex-col overflow-hidden">
                <header class=" justify-between items-center mt-6 px-2 border-b-2 border-gray-300">
                    <div class="items-center space-x-2 lg:space-x-0">
                        <button @click="sidebarOpen = true"
                            class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                            <div class=" flex justify-between">
                            <!--sub navbar
                            <div class=" inline-flex justify-center">
                 <span class="-py-1 pr-6"> <input type="checkbox" name=""></span>
                <span class="px-2 -ml-1 font-semibold  border-b-2 border-orange">Buyers
            <span class="px-2 py-0.5 ml-auto text-xs font-medium
             tracking-wide text-gray-400 bg-gray-200
              rounded-full">4</span>

                </span>
                <span class="px-2 text-gray-500">All primary</span>
                <span class="px-2 text-gray-500">Internal</span>
                <span class="px-2 text-gray-500">Social</span>
                

                            </div>
                            <div class="inline-flex py-3 -mt-4">
                                         <form method="GET">
    <div class="relative text-gray-600 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pr-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input type="search" name="q" class="py-2 text-sm text-white  rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off">
    </div>
  </form>

                            </div>
                        </div>
                    </div>

<header>
                <main class="flex-1 overflow-x-hidden overflow-y-auto">
                    <div class="px-10 py-2 mt-1">
                            <span class="text-gray-500 font-semibold">
                                Today
                            </span>
                    </div>
                    <div class="container mx-auto w-full px-6 -mb-2 ">
                        <div class="mt-4 flex px-4 py-4 justify-between bg-white
                dark:bg-gray-600 shadow-sm rounded-lg cursor-pointer">

                <div class="flex justify-center">

                    <img class="h-12 w-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"  alt="">

                    <div class="px-2 flex flex-col capitalize text-gray-600">
                        <span class="font-bold text-md">brian</span>
                        <span class="mt-1 text-gray-400 text-sm font-semibold">
                            23 THREADS
                        </span>
                    </div>

                </div>

                <div class="flex pr-8">

                    <div class="ml-16 pl-4 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">

                        <span class="mt-2 bg-red-100 text-semibold text-red-400 px-4 py-1 rounded text-black dark:text-gray-200">
                            New
                        </span>
                    </div>

                    <div class="ml-4 pt-2 flex flex-col capitalize text-gray-600
                        ">
<div>
                        <span class="mt-2 flex">
                    <img class="inline-block h-8 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                     <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </span>
                    </div>
                    </div>

                    <div class="ml-16 pt-3 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">
                      <p><span class="font-bold">New Chili piper license - </span>Hey Schott, have you lorem ipsum dolor sit  amet</p>
                    </div>



                </div>

            </div>

                    </div>
                         <div class="container mx-auto w-full px-6 -mb-2 ">
                        <div class="mt-4 flex px-4 py-4 justify-between bg-white
                dark:bg-gray-600 shadow-sm rounded-lg cursor-pointer">

                <div class="flex justify-center">

                    <img class="h-12 w-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">

                    <div class="px-4 flex flex-col capitalize text-gray-600">
                        <span class="font-bold text-md">Tom cook</span>
                        <span class="mt-1 text-gray-400 text-sm font-semibold">
                            1 THREAD
                        </span>
                    </div>

                </div>

                <div class="flex pr-8">

                    <div class="ml-16 pl-4 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">

                        <span class="mt-2 bg-red-100 text-semibold text-red-400 px-4 py-1 rounded text-black dark:text-gray-200">
                            New
                        </span>
                    </div>

                    <div class="ml-4 pt-2 flex flex-col capitalize text-gray-600
                        ">
<div>
                        <span class="mt-2 flex">
                    <img class="inline-block h-8 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                     <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </span>
                    </div>
                    </div>

                    <div class="ml-16 pt-3 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">
                      <p><span class="font-bold">New Chili piper license - </span>Hey Schott, have you lorem ipsum dolor sit  amet</p>
                    </div>



                </div>

            </div>

                    </div>

                       <div class="px-10 py-2 mt-6">
                            <span class="text-gray-500 font-semibold">
                                Yesterday
                            </span>
                    </div>
                    <div class="container mx-auto w-full px-6 -mb-2 ">
                        <div class="mt-1 flex px-4 py-4 justify-between bg-white
                dark:bg-gray-600 shadow-sm rounded-lg cursor-pointer">

                <div class="flex justify-center">

                    <img class="h-12 w-12 rounded-full object-cover" src="https://i.pravatar.cc/30?2" alt="">

                    <div class="px-4 flex flex-col capitalize text-gray-600">
                        <span class="font-bold text-md">Nickolas</span>
                        <span class="mt-1 text-gray-400 text-sm font-semibold">
                            3 THREADS
                        </span>
                    </div>

                </div>

                <div class="flex pr-8">

                    <div class="ml-16 pl-4 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">

                        <span class="mt-2 bg-red-100 text-semibold text-red-400 px-4 py-1 rounded text-black dark:text-gray-200">
                            New
                        </span>
                    </div>

                    <div class="ml-4 pt-2 flex flex-col capitalize text-gray-600
                        ">
<div> 
     <span class="mt-2 flex">
                    <img class="inline-block h-8 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                     <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </span>
                    </div>
                    </div>

                    <div class="ml-16 pt-3 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">
                      <p><span class="font-bold">New Chili piper license - </span>Hey Schott, have you lorem ipsum dolor sit  amet</p>
                    </div>



                </div>

            </div>

                    </div>

                       <div class="container mx-auto w-full px-6 -mb-2 ">
                        <div class="mt-4 flex px-4 py-4 justify-between bg-white
                dark:bg-gray-600 shadow-sm rounded-lg cursor-pointer">

                <div class="flex justify-center">

                    <img class="h-12 w-12 rounded-full object-cover" src="https://i.pravatar.cc/30?3" alt="">

                    <div class="px-4 flex flex-col capitalize text-gray-600">
                        <span class="font-bold text-md">Nickolas</span>
                        <span class="mt-1 text-gray-400 text-sm font-semibold">
                            3 THREADS
                        </span>
                    </div>

                </div>

                <div class="flex pr-8">

                    <div class="ml-16 pl-4 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">

                        <span class="mt-2 bg-red-100 text-semibold text-red-400 px-4 py-1 rounded text-black dark:text-gray-200">
                            New
                        </span>
                    </div>

                    <div class="ml-4 pt-2 flex flex-col capitalize text-gray-600
                        ">
<div>
                       
                         <span class="mt-2 flex">
                    <img class="inline-block h-8 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                     <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </span>
                    </div>
                    </div>

                    <div class="ml-16 pt-3 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">
                      <p><span class="font-bold">New Chili piper license - </span>Hey Schott, have you lorem ipsum dolor sit  amet</p>
                    </div>



                </div>

            </div>

                    </div>

   <div class="px-10 py-2 mt-6">
                            <span class="text-gray-500 font-semibold">
                                27 MAR
                            </span>
                    </div>


 

                       <div class="container mx-auto w-full px-6 -mb-2 ">
                        <div class="mt-4 flex px-4 py-4 justify-between bg-white
                dark:bg-gray-600 shadow-sm rounded-lg cursor-pointer">

                <div class="flex justify-center">

                    <img class="h-12 w-12 rounded-full object-cover" src="https://i.pravatar.cc/30?4" alt="">

                    <div class="px-4 flex flex-col capitalize text-gray-600">
                        <span class="font-bold text-md">Kenny</span>
                        <span class="mt-1 text-gray-400 text-sm font-semibold">
                            2 THREADS
                        </span>
                    </div>

                </div>

                <div class="flex pr-8">

                    <div class="ml-16 pl-4 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">

                        <span class="mt-2 bg-red-100 text-semibold text-red-400 px-4 py-1 rounded text-black dark:text-gray-200">
                            New
                        </span>
                    </div>

                    <div class="ml-4 pt-2 flex flex-col capitalize text-gray-600
                        ">
<div>
                      
                        <span class="mt-2 flex">
                    <img class="inline-block h-8 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                     <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </span>
                    </div>
                    </div>

                    <div class="ml-16 pt-3 flex flex-col capitalize text-gray-600
                        dark:text-gray-400">
                      <p><span class="font-bold">New Chili piper license - </span>Hey Schott, have you lorem ipsum dolor sit  amet</p>
                    </div>



                </div>

            </div>

                    </div>

                </main>
            </div>
        </div>
    </div>
</div>
</body>
</html>
        
        -->
    </div>
</template>

<script>
export default {
    setup() {
        
        return {

        }
    }
}
</script>
<style lang="">
    
</style>