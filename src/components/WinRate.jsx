import Grid from '@material-ui/core/Grid';

function WinRate({ teamName, specialData }) {
    let all3PWin = 0;
    let last3PWin = 0;
    let allFTWin = 0;
    let lastFTWin = 0;
    let win3PRate = 0.0;
    let winFTRate = 0.0;

    const all3PList = specialData.map((value) => value['firstThreePoint']);
    const allFTList = specialData.map((value) => value['firstFreeThrow']);
    const last3PList =
        all3PList.length >= 10 ? all3PList.slice(all3PList.length - 10, all3PList.length) : all3PList.length;
    const lastFTList =
        allFTList.length >= 10 ? allFTList.slice(allFTList.length - 10, allFTList.length) : allFTList.length;

    all3PList.forEach((it) => {
        if (it.includes(teamName)) {
            all3PWin++;
        }
    });
    last3PList.forEach((it) => {
        if (it.includes(teamName)) {
            last3PWin++;
        }
    });

    allFTList.forEach((it) => {
        if (it.includes(teamName)) {
            allFTWin++;
        }
    });
    lastFTList.forEach((it) => {
        if (it.includes(teamName)) {
            lastFTWin++;
        }
    });

    win3PRate = (all3PWin / all3PList.length) * 100;
    winFTRate = (allFTWin / allFTList.length) * 100;

    if (teamName === '') {
        return <br></br>;
    } else {
        return (
            <>
                <Grid className="WinRate" container spacing={3} direction="column">
                    <Grid item>
                        3-Point<br></br>
                        {all3PList.length}전 {all3PWin}승 {all3PList.length - all3PWin}패 (
                        {Math.round(win3PRate)}%)<br></br>
                        {last3PList.length}전 {last3PWin}승 {last3PList.length - last3PWin}패
                    </Grid>
                    <Grid item>
                        Free Throw<br></br>
                        {allFTList.length}전 {allFTWin}승 {allFTList.length - allFTWin}패 (
                        {Math.round(winFTRate)}%)<br></br>
                        {lastFTList.length}전 {lastFTWin}승 {lastFTList.length - lastFTWin}패
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default WinRate;
