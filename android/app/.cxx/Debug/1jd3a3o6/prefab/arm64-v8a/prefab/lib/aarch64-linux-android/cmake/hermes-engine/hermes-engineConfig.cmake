if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/cc/.gradle/caches/transforms-3/e8ee7c49cb2ce158ba3a0a964e662f3d/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/cc/.gradle/caches/transforms-3/e8ee7c49cb2ce158ba3a0a964e662f3d/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

