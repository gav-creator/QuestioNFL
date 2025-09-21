export async function POST(req : Request) {
    const {age,start_snap, weight, position, game_designation, started, injury_type} = await req.json();
    console.log(age,start_snap, weight, position, game_designation, started, injury_type)

    return await fetch("http://127.0.0.1:8000" + "/predict",{
        method : "POST",
        body: JSON.stringify({age:age,snap:start_snap, weight:weight, position:position,game_designation: game_designation, started:started, injury_type: injury_type}),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }); 

}