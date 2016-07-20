# Pokemon Go Enhanced

## The Dream

While this repository does not come with a lot of content,
it does come with a dream.

It's simple in essence.
Make Pokemon Go more awesome
by giving an edge over others
(face it, that's why most are here)
but still making it fun to play
by actually going out there.

This repository will contain a single-deploy suite
of nifty little things that together
will make up Pokemon Go Enhanced.
What follows is a little overview of dreams
(or as devs like to call it, a TODO list).

### Will definitely happen
- [x] Pokeballs always hit
- [x] Auto-interacting with Pokestops in range (kinda)
- [ ] Extended visibility within the app
- [ ] Web-based UI to configure everything listed here.
Hosted on a per-person basis.
- [ ] UI includes a map of all nearby pokemon
- [ ] Bulk transfer pokemon through UI

### Brainstorming
- [ ] Auto-dodge attacks
- [ ] Auto-catch everything within range
- [ ] UI allows walking to/fixing a location e.g. by tapping a location
- [ ] Auto-occupy empty gyms

As you should see from these lists,
the goal is to augment the Pokemon Go experience
but still keeping it an experience.
The player will get to decide in how far
she wants to cheat.

## How: The Tech
Woah so how will we accomplish all of these magnificent things?
We've got it all figured out right here, just need to implement it.
The proof of concept will exist of:

- Node.js `v6.3`
- MITM attacks: [rastapasta's pokemongo-mitm](https://github.com/rastapasta/pokemon-go-mitm-node.git)
- Automated API calls: No decent lib out yet so generating my own
- UI: Still need basic scaffolding! Whatever the contributor would prefer to work with

## Setup
```
~ git clone git@github.com:rubenvereecken/PokemonGo-Enhanced.git
~ cd PokemonGo-Enhanced
~ npm install
```

Now, you'll need to generate an SSL certificate that your phone trusts.
Right now this is done by starting the server once, we'll make this easier though.

Just start the server and kill it using `Ctrl+C`
```
~ node index.js
[+++] PokemonGo MITM Proxy listening on 8080
[!] Make sure to have the CA cert .http-mitm-proxy/certs/ca.pem installed on your device
```

Do as it says, copy the certificate to your phone and install it.
If you don't know how, follow instructions at https://support.google.com/nexus/answer/2844832

### Possible difficulties

- Protobuf 3 can be a real bitch to install. It's absolutely required though, for now. Get it at https://github.com/google/protobuf/releases

### Customization

Customize it using environmental variables:
```
EXPRESS_PORT=3030 PROXY_PORT=3031 node index.js
```

## Contribution
Where do you come in you ask?
Well we would love your help!

Join us on [Slack](https://pkre.slack.com) 
([invite](https://shielded-earth-81203.herokuapp.com))
in the channel `#enhanced`
to have a chat on what part of the project you'd love to help with.
Everyone's welcome: from web dev to TCP sleuth.
We even have this designer guy hanging around.

More info at [CONTRIBUTING.md](CONTRIBUTING.md)!

## In-depth TODO
### UI
- [ ] Scaffold the UI. Can be anything, Angular 2 with bootstrap, whatever.
- [ ] Create a page for displaying player details, can start out basic.
Player info will be gotten over a REST API at `/api/player`
- [ ] Create a page for basic config: turning on/off functionality.
We can hash this API out together, should be at `/api/config`
- [ ] Create a page for bulk transfer. Think on the design.
It should have at least a way of fetching all current pokemons,
then have something to multi-select them, then hit a button to transfer them.
API can be something like `GET /api/player/pokemon` for now
and `POST /api/rpc/release`, I'm thinking.

### Current Mockups
![](img/mockup-transfer.png)
![](img/mockup-settings.png)

### Ideas
You've got an original idea?
Sure, throw it in the Issues section.
