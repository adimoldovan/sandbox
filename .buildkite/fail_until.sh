if [[ $BUILDKITE_RETRY_COUNT ]] < 2; then
  exit 1
fi
