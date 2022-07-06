var mod = {
    primaryName: "ω",
    secondaryName: "Engine",
    version: "1.0.2.1",
    engineVer: "0.2.3 P1", //DO NOT MODIFY
    debugMode: true,
    themes: [
        ["Dark", "css/themes/dark.css"],
        ["Light (Legacy)", "https://veprogames.github.io/omega-layers/css/main.css"],
        ["Neon", "css/themes/neon.css"],
        ["Godot Blue", "css/themes/darkblue.css"],
        ["Halloween", "css/themes/spooky.css"],
        ["eXPerience", "css/themes/experience.css"],
        ["Relo Type", "css/themes/relo.css"],
        ["Fark Classic", "css/themes/fark.css"],
        ["Sugar", "css/themes/sugar.css"],
        ["Special 1", "css/themes/special.css"],
        ["Special 2", "css/themes/special2.css"],
        ["Wetta", "css/themes/wetta.css"],
        ["Wetta 2", "css/themes/wetta2.css"],
        ["Wetta 3", "css/themes/wetta3.css"],
        ["Wetta 4", "css/themes/wetta4.css"],
        ["Wetta 5", "css/themes/wetta5.css"],
        ["Wetta 6", "css/themes/wetta6.css"],
        ["Wetta 7", "css/themes/wetta7.css"],
        ["Wetta 8", "css/themes/wetta8.css"],
        ["Wetta 9", "css/themes/wetta9.css"],
        ["Wetta 10", "css/themes/wetta10.css"],
        ["Wetta 11", "css/themes/wetta11.css"],
        ["Wetta 12", "css/themes/wetta12.css"],
        ["Wetta 13", "css/themes/wetta13.css"],
        ["Wetta 14", "css/themes/wetta14.css"],
        ["Wetta 15", "css/themes/wetta15.css"],
        ["Wetta 16", "css/themes/wetta16.css"],
        ["Wetta 17", "css/themes/wetta17.css"],
        ["Wetta 18", "css/themes/wetta18.css"],
        ["Wetta 19", "css/themes/wetta19.css"],
        ["Wetta 20", "css/themes/wetta20.css"],
        ["Wetta 21", "css/themes/wetta21.css"],
        ["Wetta 22", "css/themes/wetta22.css"],
        ["Wetta 23", "css/themes/wetta23.css"],
        ["Wetta 24", "css/themes/wetta24.css"],
        ["Wetta 25", "css/themes/wetta25.css"],
    ],
    layerNames: [
        ["Such-Layers",
        [
            "Au",
            "0123456789",
            "abcd"
        ]],
        ["Idle Layers",
        [
            "OmegaEngine",
            "wow",
            "ABCD"
        ]],
        ["Can-Layers",
        [
            "|-z",
            "0123456789",
            "abcd"
        ]],
        ["Trate-Layers",
        [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            "0123456789",
            "abcd"
        ]],
        ["Ω-Lλγers",
        [
            "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
            "ψϝϛͱϻϙͳϸ",
            ["<span class='flipped-v'>Ω</span>", "<span class='flipped-v'>Ω</span><sup>2</sup>","<span class='flipped-v'>Ω</span><sup>3</sup>","<span class='flipped-v'>Ω</span><sup>2<sup>2</sup></sup>"]
        ]],
        ["Alphabet",
        [
            "abcdefghijklmnopqrstuvwxyz",
            "123456789",
            "ABCD"
        ]],
        ["Symbols",
        [
            '!"£$%^&*;:@',
            "<,[{}].>",
            "+×÷^"
        ]],
        ["Binary",
        [
            '01',
            "01",
            "2345"
        ]],
        ["Random",
        [
            Utils.createRandomWord(10, new Random(Date.now()).nextInt()),
            Utils.createRandomWord(10, new Random(Math.floor(Date.now()/2)).nextInt()),
            [Utils.createRandomWord(2, new Random(Math.floor(Date.now()/3)).nextInt()),Utils.createRandomWord(3, new Random(Math.floor(Date.now()/4)).nextInt()),Utils.createRandomWord(4, new Random(Math.floor(Date.now()/5)).nextInt()),Utils.createRandomWord(5, new Random(Math.floor(Date.now()/6)).nextInt())]
        ]]
    ],
    fonts: [
        ["Monospace Typewriter", "css/fonts/typespace.css"],
        ["Comic Sans", "css/fonts/comic.css"],
        ["Arial", "css/fonts/arial.css"],
        ["Roboto", "css/fonts/roboto.css"],
        ["Comfortaa", "css/fonts/comfortaa.css"],
        ["Minecraft", "css/fonts/minecraft.css"],
    ],
    saves: [
        ["Save 1", ""],
        ["Save 2", "2"],
        ["Save 3", "3"],
        ["Save 4", "4"],
    ],
    debugClasses: []
}

//DO NOT MODIFY CODE PAST THIS POINT AS IT IS NEEDED (unless your a pro coder then do some experimenting)

mod.layerNames.push(["Refresh Names", "refresh"])

document.getElementById("superImportantTitle").innerHTML = "<span class='omega'>"+mod.primaryName+"</span>"+mod.secondaryName
