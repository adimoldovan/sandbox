if [[ $(($BUILDKITE_RETRY_COUNT+0)) -gt 0 ]]; then
  PREVIOUS_BUILD_COUNT=$(($BUILDKITE_RETRY_COUNT-1))
  echo "Downloading artifact from previous run ($PREVIOUS_BUILD_COUNT)" 
  buildkite-agent artifact download "output.txt_$$PREVIOUS_BUILD_COUNT" . --build "$$BUILDKITE_BUILD_ID" --include-retried-jobs || true
  cat ./output.txt_$PREVIOUS_BUILD_COUNT || true
fi
