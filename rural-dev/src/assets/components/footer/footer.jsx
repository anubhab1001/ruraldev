import React from "react";

export default function Footer() {
    
    return(
        <>
    <div class="bg-stone-500">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6  text-gray-800 flex flex-wrap justify-center flex justify-between">
        <div class="p-5">
            <div class="text-xs uppercase text-gray-500 font-medium">Home</div>
            <a class="my-3 block font-extrabold">Company 
            </a>
            
            <a class="my-3 block" href="/#">About Us 
            </a>
            <a class="my-3 block" href="/contact">Contact 
            </a>
            
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-gray-500 font-medium">Resources</div>

            <a class="my-3 block font-extrabold" >Legal 
            </a>
            <a class="my-3 block" href="/#">Terms and conditions 
            </a>
            <a class="my-3 block" href="/#">Cookies policies
            </a>
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-gray-500 font-medium">Support</div>

            <a class="my-3 block font-extrabold" >Services 
            </a>
            <a class="my-3 block" href="/#">Branding 
            </a>
            <a class="my-3 block" href="/#">Marketing 
            </a>
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-gray-500 font-medium">Contact us</div>

            <a class="my-3 block" href="/#">XXX XXXX, lorem ipsum,abcd
                
            </a>

            <a class="my-3 block" href="/#">contact@company.com
                
            </a>
        </div>
    </div>
</div>
        </>
    );
}