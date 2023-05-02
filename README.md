# Fly.io Distributed System Challenge

Challenge: https://fly.io/dist-sys/

## Commands

### Build

```bash
# Run tsc build
npm run build
# Run tsc build and package as binary
npm run build:pkg
```

### Run

NOTE: replace `~/Downloads/maelstrom/maelstrom` with path to downloaded and extracted [maelstrom CLI](https://github.com/jepsen-io/maelstrom/releases/latest).

Run against sample input

```bash
./bin/maelstrom-node < input
```

Run echo test

```bash
~/Downloads/maelstrom/maelstrom test -w echo --bin bin/maelstrom-node --node-count 1 --time-limit 10
```

Run generate test

```bash
~/Downloads/maelstrom/maelstrom test -w unique-ids --bin bin/maelstrom-node --time-limit 30 --rate 1000 --node-count 3 --availability total --nemesis partition

```

Run broadcast (single node) test

```bash
~/Downloads/maelstrom/maelstrom test -w broadcast --bin bin/maelstrom-node --node-count 1 --time-limit 20 --rate 10

```

Run broadcast (multi node) test without network partitions

```bash
~/Downloads/maelstrom/maelstrom test -w broadcast --bin bin/maelstrom-node --node-count 5 --time-limit 20 --rate 10

```
