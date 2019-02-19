#!/bin/bash
#SBATCH -n 1
#SBATCH -N 1
#SBATCH -t 30
#SBATCH -p serial_requeue
#SBATCH --mem=100
#SBATCH --test-only

make

COOCCURRENCE_SHUF_FILE=cooccurrence.shuf.bin
BUILDDIR=build
SAVE_FILE=vectors
VERBOSE=2
VOCAB_MIN_COUNT=5
VECTOR_SIZE=50
MAX_ITER=15
BINARY=2
NUM_THREADS=8
X_MAX=10
VOCAB_FILE=vocab.txt

$BUILDDIR/glove -save-file $SAVE_FILE -threads $NUM_THREADS -input-file $COOCCURRENCE_SHUF_FILE -x-max $X_MAX -iter $MAX_ITER -vector-size $VECTOR_SIZE -binary $BINARY -vocab-file $VOCAB_FILE -verbose $VERBOSE