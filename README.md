# CT-ND

## Install
```sh
npm install
```

## Test all the modules at once
I'm using mock data for each test instance which is fed to the Rover class in the `spec` files. Same thing for the Plateau class. So probably this is the best evidence to indicating that it works
```sh
npm run test:watch
```

## Test a single module
In case you want to dig deeper on a specific modules
```sh
npm run test:watch <relative-path>
```

## Play with the rover
Test instances should be sufficient but this is a way to play around and try out the rover live. You can make changes and they will be reflected in the terminal on save
```sh
npm run play
```

## Building the repo
```sh
npm run build
```

## Type-checking the repo
```sh
npm run type-check
```
And to run in `--watch` mode:
```sh
npm run type-check:watch
```