let counter = 1;
let old = [];

function ifClick() {
    let gname = document.getElementsByName("name")[0];
    let gprice = document.getElementsByName("price")[0];
    let gdesc = document.getElementsByName("desc")[0];
    makeNew(
        counter,
        gname.value,
        gprice.value,
        gdesc.value
    );
    counter++;
}

function makeNew(cnt, gnameval, gpriceval, gdescval) {
    if (gnameval === "" || gpriceval === "" || gdescval === "") {
        alert("empty data!");
        return;
    }
    let mixin = chooseColor(gpriceval);
    if (mixin === "bad price") {
        alert(mixin);
        return;
    }

    let box = document.getElementById("boxer");
    /*
    <div class="card custom-pref">
        <div class="card-body">
            <h5 class="card-title">Name(#number)</h5>
            <p class="card-text">Desc</p>
            <p class="card-text">Price</p>
        </div>
    </div>*/
    let nd = document.createElement("div");
    nd.className = "card custom-pref " + mixin;
    let innd = document.createElement("div");
    innd.className = "card-body";
    let h5 = document.createElement("h5");
    h5.className = "card-title";
    old[old.length] = [cnt, gnameval, gpriceval, gdescval];
    h5.innerText = gnameval + '(#' + cnt + ')';
    let p1 = document.createElement("p");
    p1.className = "card-text";
    p1.innerText = gdescval;
    let p2 = document.createElement("p");
    p2.className = "card-text";
    p2.innerText = gpriceval;

    box.insertBefore(nd, null);
    nd.insertBefore(innd, null);
    innd.insertBefore(h5, null);
    innd.insertBefore(p1, null);
    innd.insertBefore(p2, null);

}

function chooseColor(price) {
    try {
        let i = parseInt(price);
        if (i <= 500) return "gr1";
        if (i <= 1000) return "gr2";
        return "gr3";
    } catch (e) {
        return "bad price";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let s = document.getElementsByName("bywhat")[0];
    s.onchange = function () {
        if (s.value === 'byname') {
            old.sort(function (a, b) {
                a = a[1].toLowerCase();
                b = b[1].toLowerCase();
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else if (s.value === 'bylendesc') {
            old.sort(function (a, b) {
                a = a[3].length;
                b = b[3].length;
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else if (s.value === 'bynumber') {
            old.sort(function (a, b) {
                a = parseInt(a[0]);
                b = parseInt(b[0]);
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else if (s.value === 'byprice') {
            old.sort(function (a, b) {
                a = parseInt(a[2]);
                b = parseInt(b[2]);
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }

        let mem = old;
        old = [];
        let ch = document.getElementById("boxer").children;
        Array.from(ch).forEach(function (e) {
            e.remove();
        });
        mem.forEach(function (e) {
            makeNew(e[0], e[1], e[2], e[3]);
        });
    }

});
