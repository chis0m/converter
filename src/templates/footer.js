module.exports = () => {
    return `
         <style>
            @font-face {
                font-family: axt;
                font-style: normal;
                font-weight: 400;
                src: local('Axiforma-Thin');
            }
         </style>
        <div
            style="width:90%;margin:0 auto;font-size:8px;border-top:1px solid #ddd;padding:10px 0;display: flex; justify-content: space-between;">
                    <span style="font-family: axt; font-size: 7px">Company Inc.</span>
            <div style="font-family: axt; font-size: 7px; color: black">
            <span class="pageNumber"></span> / 
            <span class="totalPages"></span>
            </div>
        </div>
    `;
}