if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "C:/Users/cc/.gradle/caches/transforms-3/0b8ff2350ef33c7e890a553e73e65eb5/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/libs/android.x86_64/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/cc/.gradle/caches/transforms-3/0b8ff2350ef33c7e890a553e73e65eb5/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

